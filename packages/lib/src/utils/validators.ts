import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email address');

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters');

export const phoneSchema = z
  .string()
  .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number');

export const urlSchema = z.string().url('Invalid URL');

export const newsletterSchema = z.object({
  email: emailSchema,
});

export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  message: z.string().min(10, 'Message must be at least 10 characters'),
  phone: phoneSchema.optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
