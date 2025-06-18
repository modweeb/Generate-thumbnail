<script>
    document.addEventListener('DOMContentLoaded', function() {
        const canvas = document.getElementById('thumbnailCanvas');
        const ctx = canvas.getContext('2d');
        const titleInput = document.getElementById('title');
        const excerptInput = document.getElementById('excerpt');
        const authorInput = document.getElementById('author');
        const blogNameInput = document.getElementById('blogName');
        const logoInput = document.getElementById('logo');
        const bgColorInput = document.getElementById('bgColor');
        const generateBtn = document.getElementById('generateBtn');
        const downloadJpgBtn = document.getElementById('downloadJpgBtn');
        const downloadPngBtn = document.getElementById('downloadPngBtn');
        const downloadWebpBtn = document.getElementById('downloadWebpBtn');
        const resetBtn = document.getElementById('resetBtn');
        const patternOptions = document.getElementById('patternOptions');
        const aspectRatioSelect = document.getElementById('aspectRatio');
        const patternOpacityInput = document.getElementById('patternOpacity');
        const patternOpacityValue = document.getElementById('patternOpacityValue');
        
        // ألوان النصوص
        const titleColorInput = document.getElementById('titleColor');
        const excerptColorInput = document.getElementById('excerptColor');
        const authorColorInput = document.getElementById('authorColor');
        const blogNameColorInput = document.getElementById('blogNameColor');
        
        // أحجام النصوص
        const titleSizeInput = document.getElementById('titleSize');
        const titleSizeValue = document.getElementById('titleSizeValue');
        const excerptSizeInput = document.getElementById('excerptSize');
        const excerptSizeValue = document.getElementById('excerptSizeValue');
        const authorSizeInput = document.getElementById('authorSize');
        const authorSizeValue = document.getElementById('authorSizeValue');
        const blogNameSizeInput = document.getElementById('blogNameSize');
        const blogNameSizeValue = document.getElementById('blogNameSizeValue');
        
        // أنماط الخلفية SVG
        const patterns = {
            dots: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='20' cy='20' r='2' fill='{color}'/><circle cx='50' cy='20' r='2' fill='{color}'/><circle cx='80' cy='20' r='2' fill='{color}'/><circle cx='20' cy='50' r='2' fill='{color}'/><circle cx='50' cy='50' r='2' fill='{color}'/><circle cx='80' cy='50' r='2' fill='{color}'/><circle cx='20' cy='80' r='2' fill='{color}'/><circle cx='50' cy='80' r='2' fill='{color}'/><circle cx='80' cy='80' r='2' fill='{color}'/></svg>`,
            waves: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><path d='M0,50 C20,70 40,30 60,50 S80,30 100,50 L100,100 L0,100 Z' fill='{color}'/></svg>`,
            lines: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><line x1='0' y1='20' x2='100' y2='20' stroke='{color}' stroke-width='1'/><line x1='0' y1='40' x2='100' y2='40' stroke='{color}' stroke-width='1'/><line x1='0' y1='60' x2='100' y2='60' stroke='{color}' stroke-width='1'/><line x1='0' y1='80' x2='100' y2='80' stroke='{color}' stroke-width='1'/></svg>`,
            grid: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><path d='M 0 50 L 100 50 M 50 0 L 50 100' stroke='{color}' stroke-width='1'/></svg>`,
            circles: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='20' cy='20' r='10' fill='none' stroke='{color}' stroke-width='1'/><circle cx='80' cy='20' r='10' fill='none' stroke='{color}' stroke-width='1'/><circle cx='50' cy='50' r='10' fill='none' stroke='{color}' stroke-width='1'/><circle cx='20' cy='80' r='10' fill='none' stroke='{color}' stroke-width='1'/><circle cx='80' cy='80' r='10' fill='none' stroke='{color}' stroke-width='1'/></svg>`,
            hexagons: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><path d='M50,0 L85,25 L85,75 L50,100 L15,75 L15,25 Z' fill='none' stroke='{color}' stroke-width='1'/></svg>`,
            triangles: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><polygon points='50,0 100,100 0,100' fill='none' stroke='{color}' stroke-width='1'/></svg>`,
            diamonds: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect x='25' y='25' width='50' height='50' transform='rotate(45 50 50)' fill='none' stroke='{color}' stroke-width='1'/></svg>`,
            stars: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><path d='M50,0 L61,35 L98,35 L68,57 L79,92 L50,72 L21,92 L32,57 L2,35 L39,35 Z' fill='none' stroke='{color}' stroke-width='1'/></svg>`,
            cross: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><path d='M10,50 H90 M50,10 V90' stroke='{color}' stroke-width='1'/></svg>`,
            bubbles: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='20' cy='20' r='15' fill='none' stroke='{color}' stroke-width='1'/><circle cx='60' cy='30' r='10' fill='none' stroke='{color}' stroke-width='1'/><circle cx='30' cy='60' r='12' fill='none' stroke='{color}' stroke-width='1'/><circle cx='70' cy='70' r='8' fill='none' stroke='{color}' stroke-width='1'/></svg>`,
            none: 'none'
        };
        
        let currentPattern = 'dots';
        let uploadedLogo = null;
        
        // تحديث القيم لأشرطة التمرير
        titleSizeInput.addEventListener('input', function() {
            titleSizeValue.textContent = this.value + 'px';
            generateThumbnail();
        });
        
        excerptSizeInput.addEventListener('input', function() {
            excerptSizeValue.textContent = this.value + 'px';
            generateThumbnail();
        });
        
        authorSizeInput.addEventListener('input', function() {
            authorSizeValue.textContent = this.value + 'px';
            generateThumbnail();
        });
        
        blogNameSizeInput.addEventListener('input', function() {
            blogNameSizeValue.textContent = this.value + 'px';
            generateThumbnail();
        });
        
        patternOpacityInput.addEventListener('input', function() {
            patternOpacityValue.textContent = this.value + '%';
            generateThumbnail();
        });
        
        // تغيير نسبة الأبعاد
        aspectRatioSelect.addEventListener('change', function() {
            updateCanvasSize();
            generateThumbnail();
        });
        
        // تحديث حجم الكانفاس بناءً على نسبة الأبعاد
        function updateCanvasSize() {
            const ratio = aspectRatioSelect.value;
            const [widthRatio, heightRatio] = ratio.split('/').map(Number);
            
            // الحفاظ على العرض ثابتًا تقريبًا، وتعديل الارتفاع
            const newWidth = 800;
            const newHeight = Math.round(newWidth * heightRatio / widthRatio);
            
            canvas.width = newWidth;
            canvas.height = newHeight;
        }
        
        // تحديث حجم الكانفاس عند التحميل
        updateCanvasSize();
        
        // رفع صورة الشعار
        logoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    uploadedLogo = new Image();
                    uploadedLogo.onload = function() {
                        generateThumbnail();
                    };
                    uploadedLogo.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
        
        // اختيار نمط الخلفية
        patternOptions.addEventListener('click', function(e) {
            const patternOption = e.target.closest('.tb-pattern-option');
            if (patternOption) {
                document.querySelectorAll('.tb-pattern-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                patternOption.classList.add('selected');
                currentPattern = patternOption.dataset.pattern;
                generateThumbnail();
            }
        });
        
        // توليد الصورة المصغرة
        generateBtn.addEventListener('click', generateThumbnail);
        downloadJpgBtn.addEventListener('click', () => downloadThumbnail('jpg'));
        downloadPngBtn.addEventListener('click', () => downloadThumbnail('png'));
        downloadWebpBtn.addEventListener('click', () => downloadThumbnail('webp'));
        resetBtn.addEventListener('click', resetSettings);
        
        // إعادة تعيين الإعدادات
        function resetSettings() {
            titleInput.value = '';
            excerptInput.value = '';
            authorInput.value = '';
            blogNameInput.value = '';
            logoInput.value = '';
            bgColorInput.value = '#4a6fa5';
            titleColorInput.value = '#333333';
            excerptColorInput.value = '#333333';
            authorColorInput.value = '#333333';
            blogNameColorInput.value = '#333333';
            titleSizeInput.value = 40;
            excerptSizeInput.value = 26;
            authorSizeInput.value = 15;
            blogNameSizeInput.value = 24;
            titleSizeValue.textContent = '40px';
            excerptSizeValue.textContent = '26px';
            authorSizeValue.textContent = '15px';
            blogNameSizeValue.textContent = '24px';
            patternOpacityInput.value = 20;
            patternOpacityValue.textContent = '20%';
            document.getElementById('fontSelect').selectedIndex = 0;
            aspectRatioSelect.selectedIndex = 0;
            currentPattern = 'dots';
            
            // إعادة تعيين اختيار النمط
            document.querySelectorAll('.tb-pattern-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            document.querySelector('.tb-pattern-option[data-pattern="dots"]').classList.add('selected');
            
            uploadedLogo = null;
            updateCanvasSize();
            generateThumbnail();
        }
        
        function generateThumbnail() {
            const title = titleInput.value || "عنوان المقال";
            const excerpt = excerptInput.value || "مقتطف المقال يظهر هنا...";
            const author = authorInput.value || "اسم المؤلف";
            const blogName = blogNameInput.value || "اسم المدونة";
            const bgColor = bgColorInput.value;
            const selectedFont = document.getElementById('fontSelect').value;
            const patternOpacity = patternOpacityInput.value / 100;
            const titleColor = titleColorInput.value;
            const excerptColor = excerptColorInput.value;
            const authorColor = authorColorInput.value;
            const blogNameColor = blogNameColorInput.value;
            const titleSize = parseInt(titleSizeInput.value);
            const excerptSize = parseInt(excerptSizeInput.value);
            const authorSize = parseInt(authorSizeInput.value);
            const blogNameSize = parseInt(blogNameSizeInput.value);
            
            // 1. الخلفية الأساسية
            ctx.fillStyle = lightenColor(bgColor, 90);
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // 2. رسم نمط الخلفية إذا كان مختاراً
            if (currentPattern !== 'none') {
                const patternImg = new Image();
                patternImg.onload = function() {
                    // إنشاء نمط من الصورة
                    const pattern = ctx.createPattern(patternImg, 'repeat');
                    ctx.fillStyle = pattern;
                    
                    // تعيين شفافية النمط
                    ctx.save();
                    ctx.globalAlpha = patternOpacity;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.restore();
                    
                    drawContent();
                };
                // استبدال لون النمط باللون المختار
                const patternWithColor = patterns[currentPattern].replace(/{color}/g, encodeURIComponent(bgColor));
                patternImg.src = patternWithColor;
            } else {
                drawContent();
            }
            
            function drawContent() {
                // 3. إضافة الشعار واسم المدونة
                if (uploadedLogo) {
                    ctx.shadowBlur = 0;
                    const logoSize = 60;
                    const logoX = 30;
                    const logoY = 30;
                    
                    // خلفية الشعار بتأثير زجاجي
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(logoX + logoSize/2, logoY + logoSize/2, logoSize/2 + 5, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
                    ctx.shadowBlur = 10;
                    ctx.shadowOffsetY = 5;
                    ctx.fill();
                    ctx.restore();
                    
                    // رسم الشعار
                    ctx.drawImage(uploadedLogo, logoX, logoY, logoSize, logoSize);
                    
                    // اسم المدونة مع دعم الأسطر المتعددة
                    ctx.font = `bold ${blogNameSize}px ${selectedFont}`;
                    ctx.fillStyle = blogNameColor;
                    ctx.textAlign = 'left';
                    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
                    ctx.shadowBlur = 5;
                    
                    const maxBlogNameWidth = 400; // الحد الأقصى لعرض اسم المدونة
                    const blogNameMetrics = ctx.measureText(blogName);
                    
                    if (blogNameMetrics.width > maxBlogNameWidth) {
                        // إذا كان النص طويلاً، نقسمه إلى سطرين
                        const words = blogName.split(' ');
                        let line1 = '';
                        let line2 = '';
                        let part = 0;
                        
                        for (let i = 0; i < words.length; i++) {
                            const testLine = (part === 0 ? line1 : line2) + words[i] + ' ';
                            const testWidth = ctx.measureText(testLine).width;
                            
                            if (testWidth <= maxBlogNameWidth) {
                                if (part === 0) {
                                    line1 = testLine;
                                } else {
                                    line2 = testLine;
                                }
                            } else {
                                if (part === 0) {
                                    part = 1;
                                    line2 = words[i] + ' ';
                                } else {
                                    // إذا كان السطر الثاني طويلاً أيضاً، نقطع الكلمة
                                    break;
                                }
                            }
                        }
                        
                        // نرسم السطر الأول
                        ctx.fillText(line1.trim(), logoX + logoSize + 20, logoY + logoSize/2 );
                        // نرسم السطر الثاني
                        ctx.fillText(line2.trim(), logoX + logoSize + 20, logoY + logoSize/2 );
                    } else {
                        // إذا كان النص قصيراً، نرسمه في سطر واحد
                        ctx.fillText(blogName, logoX + logoSize + 20, logoY + logoSize/2 + 10);
                    }
                } else if (blogName) {
                    ctx.font = `bold ${blogNameSize}px ${selectedFont}`;
                    ctx.fillStyle = blogNameColor;
                    ctx.textAlign = 'right';
                    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
                    ctx.shadowBlur = 5;
                    ctx.fillText(blogName, 150, 70);
                }
                
                // 4. إضافة العنوان
                ctx.fillStyle = titleColor;
                ctx.font = `bold ${titleSize}px ${selectedFont}`;
                ctx.textAlign = 'right';
                ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
                ctx.shadowBlur = 8;
                ctx.shadowOffsetY = 3;
                
                const titleX = canvas.width - 60;
                wrapTextModern(ctx, title, titleX, 160, canvas.width - 120);
                
                // 5. إضافة المقتطف
                ctx.fillStyle = excerptColor;
                ctx.font = `${excerptSize}px ${selectedFont}`;
                ctx.textAlign = 'right';
                ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
                ctx.shadowBlur = 3;
                const excerptX = canvas.width - 60;
                const excerptMaxWidth = canvas.width - 120;
                wrapTextModern(ctx, excerpt, excerptX, 220, excerptMaxWidth, excerptSize + 6);
                
                // 6. إضافة اسم المؤلف مع خطوط زخرفية
                ctx.font = `italic ${authorSize}px ${selectedFont}`;
                ctx.fillStyle = authorColor;
                ctx.textAlign = 'left';
                ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
                ctx.shadowBlur = 1;
                const authorX = 90;
                const authorY = canvas.height - 40;
                
                // خط زخرفي فوق اسم المؤلف (بلون الخلفية)
                ctx.beginPath();
                ctx.moveTo(authorX - 6, authorY - 15);
                ctx.lineTo(authorX + ctx.measureText(` ${author}`).width + 10, authorY - 15);
                ctx.strokeStyle = hexToRgba(bgColor, 0.5);
                ctx.lineWidth = 2;
                ctx.stroke();
                
                // خط زخرفي تحت اسم المدونة (بلون الخلفية)
                // خط زخرفي تحت اسم المدونة (بلون الخلفية)
if (blogName) {
    ctx.beginPath();
    ctx.moveTo(100, 90); // البداية من اليسار
    ctx.lineTo(170 + ctx.measureText(blogName).width + 0, 90); // الامتداد لليمين
    ctx.strokeStyle = hexToRgba(bgColor, 0.5);
    ctx.lineWidth = 2;
    ctx.stroke();
}
                
                ctx.fillText(` ${author}`, authorX, authorY);
            }
        }
        
        // دالة لتفصيل النص
        function wrapTextModern(context, text, x, y, maxWidth, lineHeight = 30) {
            const words = text.split(' ');
            let lines = [];
            let currentLine = words[0];
        
            for (let i = 1; i < words.length; i++) {
                const word = words[i];
                const testLine = currentLine + ' ' + word;
                const metrics = context.measureText(testLine);
                
                if (metrics.width <= maxWidth) {
                    currentLine = testLine;
                } else {
                    lines.push(currentLine);
                    currentLine = word;
                }
            }
            lines.push(currentLine);
        
            // نرسم كل سطر مع المحاذاة اليمنى
            for (let i = 0; i < lines.length; i++) {
                if (i >= 4) break; // الحد الأقصى 4 أسطر
                context.fillText(lines[i], x, y);
                y += lineHeight;
            }
        }
        
        // دالة لتحميل الصورة
        function downloadThumbnail(format = 'png') {
            let mimeType, fileExtension;
            
            switch(format) {
                case 'jpg':
                    mimeType = 'image/jpeg';
                    fileExtension = 'jpg';
                    break;
                case 'png':
                    mimeType = 'image/png';
                    fileExtension = 'png';
                    break;
                case 'webp':
                    mimeType = 'image/webp';
                    fileExtension = 'webp';
                    break;
                default:
                    mimeType = 'image/png';
                    fileExtension = 'png';
            }
            
            const link = document.createElement('a');
            link.download = `thumbnail-${Date.now()}.${fileExtension}`;
            link.href = canvas.toDataURL(mimeType);
            link.click();
        }
        
        // دالة لتفتيح اللون
        function lightenColor(color, percent) {
            const num = parseInt(color.replace('#', ''), 16);
            const amt = Math.round(2.55 * percent);
            const R = (num >> 16) + amt;
            const G = (num >> 8 & 0x00FF) + amt;
            const B = (num & 0x0000FF) + amt;
            return '#' + (
                0x1000000 +
                (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
                (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
                (B < 255 ? (B < 1 ? 0 : B) : 255)
            ).toString(16).slice(1);
        }
        
        // دالة لتحويل hex إلى rgba
        function hexToRgba(hex, alpha) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
        
        // توليد صورة افتراضية عند التحميل
        generateThumbnail();
    });
    </script>
