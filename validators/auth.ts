import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email({
    message:"الإيميل المدخل غير صحيح"
  }),
  name: z
    .string()
    .min(7, { message: "اكتب اسمك الثلاثي كاملاً" })
    .max(255),
  studentId: z
    .string()
    .min(10, {message:"يجب أن يحتوي السجل المدني على ١٠ أرقام وباللغة الإنجليزية فقط"})
    .max(10)
    .refine((val) => !isNaN(val as unknown as number), {
      message: "يجب أن يحتوي السجل المدني على أرقام فقط وباللغة الإنجليزية",
    }),
  year: z.string().min(1, { message: "يجب اختيار الصف الدراسي " }).max(30),
  password: z.string().min(6).max(100),
  confirmPassword: z.string().min(6).max(100),
});