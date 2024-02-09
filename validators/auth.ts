import { z } from "zod";

function calculateAge(birthdate: string): number {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

export const registerSchema = z.object({
  name: z
    .string()
    .min(7, { message: "اكتب اسمك الثلاثي كاملاً" })
    .max(255),
date: z.string().min(1, { message: "  يجب ادخال تاريخ الميلاد " })
    .refine((birthdate) => calculateAge(birthdate) >= 5, {
      message: " يجب أن يكون العمر 5 سنوات أو أكثر",
    }),    age: z.string(),
  year: z.string().min(1, { message: "يجب اختيار الصف الدراسي " }).max(30),
//   password: z.string().min(6, { message: "يجب أن تحتوي كلمة المرور على ٧ ارقام على الأقل" }).max(100),
//   confirmPassword: z.string().min(6,  { message: "يجب أن تحتوي كلمة المرور على ٧ ارقام على الأقل" }).max(100),
  fatherName: z.string()
  .min(7, { message: "اكتب اسم ولي الأمر الثلاثي كاملاً" })
  .max(255),
    fatherEmail: z.string().email({message:"الإيميل المدخل غير صحيح" }),
    fatherPhoneNumber: z
    .string()
    .min(10, {message:"يجب أن يكون رقم الهاتف من ١٠ أرقام وباللغة الإنجليزية فقط"})
    .max(10)
    .refine((val) => !isNaN(val as unknown as number), {
    message: "يجب أن يتكون رقم الهاتف من أرقام فقط وباللغة الإنجليزية",
    }),

    studentID: z
    .string()
    .min(6, {message:"يجب أن يحتوي الرقم الأكاديمي على 6 أرقام وباللغة الإنجليزية فقط"})
    .max(6, {message:"يجب أن يحتوي الرقم الأكاديمي على 6 أرقام وباللغة الإنجليزية فقط"})
    .refine((val) => !isNaN(val as unknown as number), {
      message: "يجب أن يحتوي الرقم الأكاديمي على أرقام فقط وباللغة الإنجليزية",
    }),
});