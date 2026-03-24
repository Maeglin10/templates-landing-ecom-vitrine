'use client';

import React, { useState, useCallback } from 'react';
import { z } from 'zod';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

interface FormBuilderConfig {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => Promise<void>;
  schema?: z.ZodSchema;
}

export function useFormBuilder(config: FormBuilderConfig) {
  const [formData, setFormData] = useState<Record<string, any>>(
    config.fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setErrors({});

      try {
        if (config.schema) {
          config.schema.parse(formData);
        }
        await config.onSubmit(formData);
        setSuccess(true);
        setFormData(
          config.fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
        );
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldErrors: Record<string, string> = {};
          error.errors.forEach((err) => {
            const field = err.path[0] as string;
            fieldErrors[field] = err.message;
          });
          setErrors(fieldErrors);
        }
      } finally {
        setLoading(false);
      }
    },
    [config, formData]
  );

  return {
    formData,
    errors,
    loading,
    success,
    setSuccess,
    handleChange,
    handleSubmit,
  };
}
