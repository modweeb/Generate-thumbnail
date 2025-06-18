export default {
  // البيانات الأساسية
  title: "مولد الصور المصغرة للمقالات | Modweeb",
  description: "أداة متكاملة لإنشاء صور مصغرة احترافية لمقالاتك ومدونتك بتصميمات قابلة للتخصيص بالكامل",
  url: "https://modweeb.com", // بدون شرطة مائلة في النهاية
  
  // روابط التواصل الاجتماعي (اختيارية)
  socialMedia: {
    twitter: {
      url: "https://twitter.com/modweeb",
      handle: "@modweeb"
    },
    youtube: {
      url: "https://youtube.com/@modweeb"
    },
    github: {
      url: "https://github.com/modweeb"
    }
  },

  // إعدادات الأداة
  appSettings: {
    defaultTheme: "light",
    supportedImageFormats: ["jpg", "png", "webp"],
    maxFileSize: 5 * 1024 * 1024 // 5MB
  },

  // حقوق النشر المخصصة لموقعك
  copyright: `© ${new Date().getFullYear()} Modweeb. جميع الحقوق محفوظة`
};
