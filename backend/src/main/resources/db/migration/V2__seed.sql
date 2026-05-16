-- V2__seed.sql — Phase 1: Foundation (Arabic content)
-- ======================================================

-- =====================================================
-- PHASE 1 COURSE
-- =====================================================
INSERT INTO courses (id, slug, title, description, level, color, icon, order_index, is_published)
VALUES (1, 'phase-1-foundation', 'المرحلة الأولى: الأساس',
        'Java + Spring Core من الصفر — تبني أساس قوي في البرمجة باستخدام Java ثم تنتقل إلى المفاهيم الأساسية في Spring Framework',
        'BEGINNER', '#22D3EE', '🟢', 1, true);

-- =====================================================
-- MODULE 1.1 — Java Essentials (10 Lessons)
-- =====================================================
INSERT INTO modules (id, course_id, title, description, order_index, duration_minutes)
VALUES (1, 1, 'أساسيات Java', 'المتغيرات، الشروط، الحلقات، الدوال، OOP، الاستثناءات، والمجموعات', 1, 240);

-- Lesson 1.1: Introduction to Java
INSERT INTO lessons (id, module_id, title, type, content_markdown, code_example, expected_output, duration_minutes, order_index, xp_reward)
VALUES (1, 1, 'ما هي Java؟ — مدخل إلى عالم البرمجة', 'THEORY',
E'## 🎯 ما ستتعلمه في هذا الدرس\n- ما هي لغة Java ولماذا نستخدمها\n- مفهوم JVM وكيف يعمل\n- كتابة أول برنامج Hello World\n- شرح مكونات البرنامج الأساسي\n\n## 📖 الشرح\nتخيل أنك تريد التحدث مع شخص من دولة أخرى لا يفهم لغتك. تحتاج إلى مترجم. Java تشبه هذا المترجم — تكتب الكود مرة واحدة، و Java تجعله يعمل على أي جهاز.\n\nJVM (Java Virtual Machine) هي الآلة الافتراضية التي تشغل برامج Java. فكر فيها كمشغل أقراص DVD: أي قرص DVD يعمل على أي مشغل. بنفس الطريقة، أي كود Java يعمل على أي JVM.\n\n## 💡 المفهوم الأساسي\nJava لغة "اكتب مرة واحدة، شغّل في أي مكان" (WORA). الكود يُترجم إلى bytecode يعمل على JVM، مما يجعل البرنامج محمولاً بين أنظمة التشغيل المختلفة.\n\n## 💻 مثال عملي\n```java\n// هذا أول برنامج Java لك\n// public class = الحاوية الرئيسية للكود\npublic class Main {\n    // main method = نقطة بداية أي برنامج Java\n    public static void main(String[] args) {\n        // System.out.println = تطبع نصاً على الشاشة\n        System.out.println("مرحباً بك في عالم Java!");\n    }\n}\n```\n\n## ⚠️ الأخطاء الشائعة\n- نسيان كتابة `public static void main(String[] args)` بالضبط — أي خطأ إملائي يمنع تشغيل البرنامج\n- نسيان الفاصلة المنقوطة `;` في نهاية كل جملة\n- اسم الملف يجب أن يطابق اسم الـ class\n\n## ✅ الممارسة الصحيحة\n```java\n// ✅ صحيح: اسم الكلاس يطابق اسم الملف\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World!");\n    }\n}\n```\n```java\n// ❌ خطأ: نسيان الفاصلة المنقوطة\nSystem.out.println("Hello")\n```\n\n## 🧪 جرّب بنفسك\nافتح المحرر وأكتب برنامجاً يطبع اسمك. جرب تشغيله وشاهد النتيجة.',
        'public class Main {\n    public static void main(String[] args) {\n        // اكتب اسمك هنا\n        System.out.println("مرحباً، أنا [اسمك]!");\n    }\n}',
        'مرحباً، أنا [اسمك]!', 20, 1, 10);

-- Lesson 1.2: Variables and Data Types
INSERT INTO lessons (id, module_id, title, type, content_markdown, code_example, expected_output, duration_minutes, order_index, xp_reward)
VALUES (2, 1, 'المتغيرات وأنواع البيانات', 'CODE',
E'## 🎯 ما ستتعلمه في هذا الدرس\n- ما هو المتغير ولماذا نستخدمه\n- أنواع البيانات الأساسية: int, double, boolean, String\n- كيفية تعريف المتغيرات\n- قواعد تسمية المتغيرات\n\n## 📖 الشرح\nتخيل أن المتغيرات هي صناديق تخزين. كل صندوق له اسم (اسم المتغير) ونوع (ماذا يمكن أن يحتوي) وقيمة (المحتوى الفعلي).\n\nإذا كان لديك صندوق مكتوب عليه "عدد التفاحات" لا يمكنك وضع نص بداخله — يجب أن تضع رقماً. هذا هو مفهوم "النوع" في البرمجة.\n\n## 💡 المفهوم الأساسي\nالمتغير = اسم + نوع + قيمة. Java لغة "strongly typed" — كل متغير له نوع محدد ولا يمكن تغييره.\n\n## 💻 مثال عملي\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int age = 25;           // عدد صحيح\n        double price = 99.99;   // عدد عشري\n        boolean isStudent = true; // صح أو خطأ\n        String name = "أحمد";   // نص\n\n        System.out.println("الاسم: " + name);\n        System.out.println("العمر: " + age);\n        System.out.println("السعر: " + price);\n        System.out.println("طالب: " + isStudent);\n    }\n}\n```\n\n## ⚠️ الأخطاء الشائعة\n- استخدام متغير قبل تعريفه\n- وضع قيمة String في متغير int\n- نسيان أن أسماء المتغيرات حساسة لحالة الأحرف (age ≠ Age)\n\n## ✅ الممارسة الصحيحة\nاستخدم camelCase: `studentAge`, `firstName`, `totalPrice` — أسماء واضحة وذات معنى.\n\n## 🧪 جرّب بنفسك\nأنشئ 3 متغيرات: اسمك (String)، عمرك (int)، وطولك بالمتر (double). اطبعهم جميعاً.',
        E'public class Main {\n    public static void main(String[] args) {\n        String name = "محمد";\n        int age = 30;\n        double height = 1.75;\n        System.out.println("الاسم: " + name);\n        System.out.println("العمر: " + age);\n        System.out.println("الطول: " + height + " متر");\n    }\n}',
        'الاسم: محمد\nالعمر: 30\nالطول: 1.75 متر', 25, 2, 10);

-- Lesson 1.3: Operators and Expressions
INSERT INTO lessons (id, module_id, title, type, content_markdown, code_example, expected_output, duration_minutes, order_index, xp_reward)
VALUES (3, 1, 'المعاملات والتعابير الحسابية', 'CODE',
E'## 🎯 ما ستتعلمه في هذا الدرس\n- المعاملات الحسابية: + - * / %\n- معاملات المقارنة: == != > < >= <=\n- المعاملات المنطقية: && || !\n- أولوية المعاملات\n\n## 📖 الشرح\nالمعاملات (Operators) هي الأدوات التي تستخدمها للقيام بالعمليات. مثل الآلة الحاسبة: + للجمع، - للطرح، * للضرب، / للقسمة.\n\nمعاملات المقارنة تشبه سؤال "أيهما أكبر؟" — تعطيك جواباً بنعم (true) أو لا (false). المعاملات المنطقية تربط بين عدة شروط.\n\n## 💡 المفهوم الأساسي\nالمعاملات هي "أفعال" تعمل على "مفعول به" (operands). كل معاملة لها قواعد وأولويات — الضرب قبل الجمع تماماً كالرياضيات.\n\n## 💻 مثال عملي\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int a = 10, b = 3;\n        System.out.println("جمع: " + (a + b));     // 13\n        System.out.println("طرح: " + (a - b));     // 7\n        System.out.println("ضرب: " + (a * b));     // 30\n        System.out.println("قسمة: " + (a / b));     // 3\n        System.out.println("باقي القسمة: " + (a % b)); // 1\n\n        boolean result = (a > b) && (a > 0);\n        System.out.println("النتيجة: " + result);\n    }\n}\n```\n\n## ⚠️ الأخطاء الشائعة\n- `=` للتعيين و `==` للمقارنة — لا تخلط بينهما\n- قسمة عددين صحيحين تعطي نتيجة صحيحة (10/3 = 3 وليس 3.33)\n- `&&` و `||` تقيّم باختصار (short-circuit)\n\n## 🧪 جرّب بنفسك\nاكتب برنامجاً يحسب مساحة مستطيل (الطول × العرض) ومحيطه. استخدم متغيرين للطول والعرض.',
        E'public class Main {\n    public static void main(String[] args) {\n        double length = 5.0;\n        double width = 3.0;\n        double area = length * width;\n        double perimeter = 2 * (length + width);\n        System.out.println("المساحة: " + area);\n        System.out.println("المحيط: " + perimeter);\n    }\n}',
        'المساحة: 15.0\nالمحيط: 16.0', 25, 3, 10);

-- Lesson 1.4: Conditionals (if/else)
INSERT INTO lessons (id, module_id, title, type, content_markdown, code_example, expected_output, duration_minutes, order_index, xp_reward)
VALUES (4, 1, 'الشروط — if, else if, else', 'CODE',
E'## 🎯 ما ستتعلمه في هذا الدرس\n- جملة if الشرطية\n- else و else if\n- الشروط المتداخلة\n- ternary operator (?:)\n\n## 📖 الشرح\nالشروط في البرمجة مثل مفترق الطرق. تسأل سؤالاً: "هل هذا صحيح؟" إذا كان نعم، تذهب في طريق. إذا كان لا، تذهب في طريق آخر.\n\nمثال: إذا كانت السماء تمطر → خذ مظلة. وإلا → لا تأخذ شيئاً.\n\n## 💡 المفهوم الأساسي\nif تختبر شرطاً boolean. إذا كان true ينفذ الكود داخل الأقواس. else تنفذ عندما يكون الشرط false.\n\n## 💻 مثال عملي\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int score = 85;\n\n        if (score >= 90) {\n            System.out.println("ممتاز! A");\n        } else if (score >= 80) {\n            System.out.println("جيد جداً! B");\n        } else if (score >= 70) {\n            System.out.println("جيد! C");\n        } else {\n            System.out.println("حاول مرة أخرى");\n        }\n    }\n}\n```\n\n## ⚠️ الأخطاء الشائعة\n- نسيان الأقواس `{ }` — إذا كان هناك أكثر من سطر\n- استخدام `=` بدلاً من `==` في الشرط\n- كتابة شرط لن يتحقق أبداً (dead code)\n\n## 🧪 جرّب بنفسك\nاكتب برنامجاً يحدد ما إذا كان العدد زوجياً أم فردياً باستخدام باقي القسمة %.',
        E'public class Main {\n    public static void main(String[] args) {\n        int number = 7;\n        if (number % 2 == 0) {\n            System.out.println(number + " عدد زوجي");\n        } else {\n            System.out.println(number + " عدد فردي");\n        }\n    }\n}',
        '7 عدد فردي', 25, 4, 10);

-- Lesson 1.5: Loops (for, while)
INSERT INTO lessons (id, module_id, title, type, content_markdown, code_example, expected_output, duration_minutes, order_index, xp_reward)
VALUES (5, 1, 'الحلقات التكرارية — for و while', 'CODE',
E'## 🎯 ما ستتعلمه في هذا الدرس\n- حلقة for واستخداماتها\n- حلقة while\n- حلقة do-while\n- break و continue\n\n## 📖 الشرح\nتخيل أنك تريد طباعة الأرقام من 1 إلى 100. هل ستكتب 100 سطر؟ لا! تستخدم حلقة تكرارية تكرر الكود تلقائياً.\n\nfor تشبه عداداً: تبدأ من رقم، تستمر حتى تصل لهدف، وتزيد بمقدار محدد كل مرة. while تستمر طالما شرط معين صحيح.\n\n## 💡 المفهوم الأساسي\nالحلقة = تكرار كود عدة مرات. for عندما تعرف عدد التكرارات مسبقاً. while عندما لا تعرف لكن تعرف شرط التوقف.\n\n## 💻 مثال عملي\n```java\npublic class Main {\n    public static void main(String[] args) {\n        // for loop — نعرف العدد\n        for (int i = 1; i <= 5; i++) {\n            System.out.println("تكرار رقم: " + i);\n        }\n\n        // while loop — نعرف الشرط\n        int count = 0;\n        while (count < 3) {\n            System.out.println("العداد: " + count);\n            count++;\n        }\n    }\n}\n```\n\n## ⚠️ الأخطاء الشائعة\n- حلقة لا نهائية (infinite loop) — نسيان تحديث العداد\n- `<=` vs `<` — فرق دقيق لكنه مهم\n- الفاصلة المنقوطة بعد `for()` — خطأ شائع\n\n## 🧪 جرّب بنفسك\nاكتب برنامجاً يستخدم حلقة for لطباعة جدول الضرب للعدد 5 (من 1 إلى 10).',
        E'public class Main {\n    public static void main(String[] args) {\n        int number = 5;\n        for (int i = 1; i <= 10; i++) {\n            System.out.println(number + " × " + i + " = " + (number * i));\n        }\n    }\n}',
        '5 × 1 = 5\n5 × 2 = 10\n5 × 3 = 15\n5 × 4 = 20\n5 × 5 = 25\n5 × 6 = 30\n5 × 7 = 35\n5 × 8 = 40\n5 × 9 = 45\n5 × 10 = 50', 25, 5, 10);

-- Lesson 1.6: Arrays
INSERT INTO lessons (id, module_id, title, type, content_markdown, code_example, expected_output, duration_minutes, order_index, xp_reward)
VALUES (6, 1, 'المصفوفات — Arrays', 'CODE',
E'## 🎯 ما ستتعلمه في هذا الدرس\n- تعريف المصفوفة\n- الوصول إلى عناصر المصفوفة\n- التكرار على المصفوفة\n- المصفوفات متعددة الأبعاد\n\n## 📖 الشرح\nتخيل أن لديك 100 درجة طالب. هل ستعرف 100 متغير (`grade1`, `grade2`, ...)؟ الطريقة الأفضل هي استخدام مصفوفة — وعاء واحد يحتوي على عدة قيم من نفس النوع.\n\nفكر في المصفوفة كقطار بعربات مرقمة. كل عربة (index) تحمل قيمة واحدة. العربة الأولى رقمها 0.\n\n## 💡 المفهوم الأساسي\nالمصفوفة = مجموعة من القيم من نفس النوع، مرتبة في الذاكرة. تبدأ من index 0.\n\n## 💻 مثال عملي\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int[] grades = {85, 90, 78, 92, 88};\n\n        System.out.println("عدد الطلاب: " + grades.length);\n        System.out.println("أول درجة: " + grades[0]);\n        System.out.println("آخر درجة: " + grades[grades.length - 1]);\n\n        int sum = 0;\n        for (int grade : grades) {\n            sum += grade;\n        }\n        double average = (double) sum / grades.length;\n        System.out.println("المتوسط: " + average);\n    }\n}\n```\n\n## ⚠️ الأخطاء الشائعة\n- ArrayIndexOutOfBoundsException — محاولة الوصول لمؤشر غير موجود\n- نسيان أن المصفوفات تبدأ من 0\n- الخلط بين length() للـ String و length للمصفوفة\n\n## 🧪 جرّب بنفسك\nأنشئ مصفوفة من 5 أسماء واطبعها باستخدام حلقة for-each.',
        E'public class Main {\n    public static void main(String[] args) {\n        String[] names = {"أحمد", "سارة", "محمد", "فاطمة", "علي"};\n        System.out.println("قائمة الأسماء:");\n        for (String name : names) {\n            System.out.println("- " + name);\n        }\n    }\n}',
        'قائمة الأسماء:\n- أحمد\n- سارة\n- محمد\n- فاطمة\n- علي', 20, 6, 10);

-- Lesson 1.7: Methods (Functions)
INSERT INTO lessons (id, module_id, title, type, content_markdown, code_example, expected_output, duration_minutes, order_index, xp_reward)
VALUES (7, 1, 'الدوال — Methods', 'CODE',
E'## 🎯 ما ستتعلمه في هذا الدرس\n- تعريف واستدعاء الدوال\n- المعاملات (Parameters) والقيمة المرجعة\n- void vs return\n- لماذا نستخدم الدوال\n\n## 📖 الشرح\nالدالة هي وصفة. بدلاً من كتابة نفس الخطوات كل مرة، اكتبها مرة واحدة ثم استخدمها متى شئت.\n\nفكر في الدالة كآلة: تضع مدخلات (Parameters)، تقوم الآلة بعملها، وتخرج النتيجة (Return). مثلاً: آلة صنع القهوة — تضع الماء والبن، تخرج قهوة.\n\n## 💡 المفهوم الأساسي\nالدوال تقسم البرنامج إلى قطع صغيرة قابلة لإعادة الاستخدام. مبدأ DRY: Don''t Repeat Yourself.\n\n## 💻 مثال عملي\n```java\npublic class Main {\n    // دالة تجمع عددين وترجع النتيجة\n    public static int add(int a, int b) {\n        return a + b;\n    }\n\n    // دالة تطبع رسالة ترحيب\n    public static void greet(String name) {\n        System.out.println("مرحباً " + name + "!");\n    }\n\n    public static void main(String[] args) {\n        greet("أحمد");\n        int result = add(5, 3);\n        System.out.println("5 + 3 = " + result);\n        System.out.println("10 + 20 = " + add(10, 20));\n    }\n}\n```\n\n## ⚠️ الأخطاء الشائعة\n- نسيان كتابة static عند استدعاء الدالة من main\n- عدم تطابق نوع المرجوع\n- نسيان return في الدوال غير void\n\n## 🧪 جرّب بنفسك\nاكتب دالة `isEven` تستقبل عدداً وترجع true إذا كان زوجياً أو false إذا كان فردياً. استخدمها في main.',
        E'public class Main {\n    public static boolean isEven(int number) {\n        return number % 2 == 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println("4 زوجي؟ " + isEven(4));\n        System.out.println("7 زوجي؟ " + isEven(7));\n    }\n}',
        '4 زوجي؟ true\n7 زوجي؟ false', 25, 7, 10);

-- Lesson 1.8: Classes and Objects (OOP Intro)
INSERT INTO lessons (id, module_id, title, type, content_markdown, code_example, expected_output, duration_minutes, order_index, xp_reward)
VALUES (8, 1, 'مقدمة إلى OOP — الكلاسات والكائنات', 'THEORY',
E'## 🎯 ما ستتعلمه في هذا الدرس\n- ما هي البرمجة الكائنية (OOP)\n- الفرق بين class و object\n- الخصائص (fields) والسلوكيات (methods)\n- إنشاء كائن من كلاس\n\n## 📖 الشرح\nالبرمجة الكائنية تشبه لعبة المكعبات. الكلاس هو القالب (مخطط سيارة)، والكائن هو الشيء الحقيقي (سيارة محددة).\n\nكل كائن له:\n- خصائص (حالته): اللون، السرعة، عدد الركاب\n- سلوكيات (أفعاله): تشغيل، تسريع، توقف\n\n## 💡 المفهوم الأساسي\nClass = مخطط. Object = شيء حقيقي مبني من المخطط. OOP تنظم الكود حول "أشياء" بدلاً من "أفعال".\n\n## 💻 مثال عملي\n```java\n// الكلاس — المخطط\nclass Student {\n    // الخصائص\n    String name;\n    int age;\n\n    // السلوكيات\n    void introduce() {\n        System.out.println("مرحباً، أنا " + name + "، عمري " + age + " سنة");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // إنشاء كائن — الشيء الحقيقي\n        Student s1 = new Student();\n        s1.name = "أحمد";\n        s1.age = 22;\n        s1.introduce();\n\n        Student s2 = new Student();\n        s2.name = "سارة";\n        s2.age = 20;\n        s2.introduce();\n    }\n}\n```\n\n## ⚠️ الأخطاء الشائعة\n- نسيان `new` عند إنشاء كائن\n- الخلط بين class (المخطط) و object (المثيل)\n- محاولة استخدام object بدون إنشائه (NullPointerException)\n\n## 🧪 جرّب بنفسك\nأنشئ كلاس `Car` بخصائص: brand, model, year. وأنشئ دالة `displayInfo` تطبع معلومات السيارة. أنشئ كائنين وجربهم.',
        E'class Car {\n    String brand;\n    String model;\n    int year;\n\n    void displayInfo() {\n        System.out.println(brand + " " + model + " (" + year + ")");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car car1 = new Car();\n        car1.brand = "Toyota";\n        car1.model = "Camry";\n        car1.year = 2024;\n        car1.displayInfo();\n    }\n}',
        'Toyota Camry (2024)', 30, 8, 10);

-- Lesson 1.9: Exceptions (try-catch)
INSERT INTO lessons (id, module_id, title, type, content_markdown, code_example, expected_output, duration_minutes, order_index, xp_reward)
VALUES (9, 1, 'معالجة الاستثناءات — try-catch', 'CODE',
E'## 🎯 ما ستتعلمه في هذا الدرس\n- ما هي الاستثناءات (Exceptions)\n- try-catch blocks\n- finally clause\n- أنواع الاستثناءات الشائعة\n\n## 📖 الشرح\nالبرنامج المثالي لا يواجه أخطاء، لكن البرامج الحقيقية تفعل. تخيل أنك تقود سيارة: هناك أشياء غير متوقعة — إطار مثقوب، إشارة معطلة. تحتاج خطة طوارئ.\n\ntry-catch هي خطة الطوارئ الخاصة بك. "جرب هذا الكود، وإذا حدث خطأ، تعامل معه بهدوء بدلاً من انهيار البرنامج."\n\n## 💡 المفهوم الأساسي\ntry = ضع الكود الخطير هنا. catch = ماذا تفعل لو حصل خطأ. أخيراً finally = ينفذ دائماً بغض النظر عن الخطأ.\n\n## 💻 مثال عملي\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int[] numbers = {10, 20, 30};\n\n        try {\n            System.out.println("العنصر: " + numbers[5]); // خطأ!\n        } catch (ArrayIndexOutOfBoundsException e) {\n            System.out.println("خطأ: المؤشر خارج حدود المصفوفة");\n            System.out.println("الحد الأقصى: " + (numbers.length - 1));\n        } finally {\n            System.out.println("انتهت محاولة الوصول للمصفوفة");\n        }\n    }\n}\n```\n\n## ⚠️ الأخطاء الشائعة\n- catch فارغ (empty catch) — ابتلاع الخطأ دون معالجة\n- catch عام (catch Exception) لكل شيء دون تفصيل\n- وضع كود لا يمكن أن يرمي استثناء داخل try\n\n## 🧪 جرّب بنفسك\nاكتب برنامجاً يقسم عددين. إذا كان المقسوم عليه صفر، امسك ArithmeticException واطبع رسالة خطأ.',
        E'public class Main {\n    public static void main(String[] args) {\n        int a = 10, b = 0;\n        try {\n            int result = a / b;\n            System.out.println("النتيجة: " + result);\n        } catch (ArithmeticException e) {\n            System.out.println("خطأ: لا يمكن القسمة على صفر!");\n        }\n    }\n}',
        'خطأ: لا يمكن القسمة على صفر!', 20, 9, 10);

-- Lesson 1.10: Lists and ArrayLists
INSERT INTO lessons (id, module_id, title, type, content_markdown, code_example, expected_output, duration_minutes, order_index, xp_reward)
VALUES (10, 1, 'المجموعات — ArrayList', 'CODE',
E'## 🎯 ما ستتعلمه في هذا الدرس\n- الفرق بين المصفوفات و ArrayList\n- إضافة وحذف عناصر\n- التكرار على ArrayList\n- دوال مفيدة: contains, indexOf, size\n\n## 📖 الشرح\nالمصفوفات لها حجم ثابت. ماذا لو احتجت إضافة المزيد من العناصر لاحقاً؟ هنا يأتي دور ArrayList — مصفوفة ديناميكية تنمو تلقائياً.\n\nفكر في ArrayList كحقيبة سحرية — تضع فيها ما تريد، وتكبر الحقيبة تلقائياً لتستوعب المزيد.\n\n## 💡 المفهوم الأساسي\nArrayList مجموعة ديناميكية الحجم. جزء من Java Collections Framework.\n\n## 💻 مثال عملي\n```java\nimport java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> fruits = new ArrayList<>();\n\n        fruits.add("تفاح");\n        fruits.add("موز");\n        fruits.add("برتقال");\n        fruits.add(1, "فراولة"); // إضافة في موقع محدد\n\n        System.out.println("الفواكه: " + fruits);\n        System.out.println("العدد: " + fruits.size());\n\n        fruits.remove("موز");\n        System.out.println("بعد الحذف: " + fruits);\n\n        System.out.println("هل يوجد تفاح؟ " + fruits.contains("تفاح"));\n    }\n}\n```\n\n## ⚠️ الأخطاء الشائعة\n- نسيان import java.util.ArrayList\n- محاولة الوصول لمؤشر غير موجود (IndexOutOfBoundsException)\n- استخدام == للمقارنة بدلاً من equals() مع الكائنات\n\n## 🧪 جرّب بنفسك\nأنشئ ArrayList من الأعداد الصحيحة. أضف 5 أعداد. ثم احسب المجموع باستخدام حلقة.',
        E'import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> numbers = new ArrayList<>();\n        numbers.add(5);\n        numbers.add(10);\n        numbers.add(15);\n        numbers.add(20);\n        numbers.add(25);\n\n        int sum = 0;\n        for (int num : numbers) {\n            sum += num;\n        }\n        System.out.println("المجموع: " + sum);\n    }\n}',
        'المجموع: 75', 20, 10, 10);

-- =====================================================
-- MODULE 1.2 — Build Tools (6 Lessons)
-- =====================================================
INSERT INTO modules (id, course_id, title, description, order_index, duration_minutes)
VALUES (2, 1, 'أدوات البناء', 'Maven, Gradle, إدارة التبعيات، هيكلة المشروع', 2, 150);

-- Lesson 2.1: What is a Build Tool?
INSERT INTO lessons (id, module_id, title, type, content_markdown, code_example, expected_output, duration_minutes, order_index, xp_reward)
VALUES (11, 2, 'ما هي أدوات البناء؟', 'THEORY',
E'## 🎯 ما ستتعلمه في هذا الدرس\n- ما هي أداة البناء ولماذا نحتاجها\n- تجميع الكود (Compilation)\n- إدارة التبعيات (Dependencies)\n- اختبار وتعبئة المشروع\n\n## 📖 الشرح\nتخيل أنك تبني منزلاً. أنت لا تصنع الطوب والأسمنت بنفسك — تشتريها جاهزة. أداة البناء هي المقاول الذي ينسق كل شيء: يشتري المواد (التبعيات)، يبني (يجمع الكود)، يتأكد من الجودة (اختبارات)، ويجهز المنزل (يحزم المشروع).\n\n## 💡 المفهوم الأساسي\nMaven و Gradle أداتا بناء تقومان بتحميل المكتبات تلقائياً، تجميع الكود، تشغيل الاختبارات، وتعبئة المشروع في ملف JAR.\n\n## 💻 مثال عملي\n```\nبدون أداة بناء:\n- حمل كل مكتبة يدوياً\n- نفذ javac لكل ملف\n- نفذ الاختبارات يدوياً\n\nمع Maven:\n- mvn compile → يجمع الكود\n- mvn test → يشغل الاختبارات\n- mvn package → ينتج JAR\n```\n\n## ⚠️ الأخطاء الشائعة\n- تحميل JARs يدوياً ووضعها في classpath\n- عدم فهم مفهوم transitive dependencies\n- نسيان تحديد versions للتبعيات\n\n## 🧪 جرّب بنفسك\nتصفح pom.xml الموجود في مشروع SpringPath ولاحظ كيف يتم تعريف التبعيات.',
        null, null, 20, 1, 10);

-- Lesson 2.2: Maven pom.xml
INSERT INTO lessons (id, module_id, title, type, content_markdown, code_example, expected_output, duration_minutes, order_index, xp_reward)
VALUES (12, 2, 'فهم Maven و pom.xml', 'CODE',
E'## 🎯 ما ستتعلمه في هذا الدرس\n- هيكل pom.xml\n- GAV coordinates (groupId, artifactId, version)\n- تعريف التبعيات\n- مفهوم scope\n\n## 📖 الشرح\npom.xml هو بطاقة هوية مشروعك. يخبر Maven: من أنت (GAV)، ماذا تحتاج (تبعيات)، وكيف تبني (plugins).\n\n## 💡 المفهوم الأساسي\nPOM = Project Object Model. قلب أي مشروع Maven.\n\n## 💻 مثال عملي\n```xml\n<project>\n    <groupId>com.example</groupId>       <!-- منظمة/شركة -->\n    <artifactId>my-app</artifactId>       <!-- اسم المشروع -->\n    <version>1.0.0</version>              <!-- الإصدار -->\n\n    <dependencies>\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-web</artifactId>\n            <version>3.3.0</version>\n        </dependency>\n    </dependencies>\n</project>\n```\n\n## ⚠️ الأخطاء الشائعة\n- تعارض الإصدارات (version conflicts)\n- scope خاطئ — مثلاً compile بدلاً من runtime\n- نسيان refresh بعد تعديل pom.xml\n\n## 🧪 جرّب بنفسك\nافتح pom.xml الخاص بمشروع SpringPath. حدد: groupId, artifactId, و3 تبعيات مهمة.',
        null, null, 20, 2, 10);

-- Lesson 2.3: Maven Lifecycle
INSERT INTO lessons (id, module_id, title, type, content_markdown, code_example, expected_output, duration_minutes, order_index, xp_reward)
VALUES (13, 2, 'دورة حياة Maven — Lifecycle', 'THEORY',
E'## 🎯 ما ستتعلمه في هذا الدرس\n- مراحل Maven lifecycle\n- clean, compile, test, package, install\n- مفهوم plugin goals\n- أوامر Maven الأساسية\n\n## 📖 الشرح\nدورة حياة Maven مثل خط تجميع في مصنع. هناك محطات محددة تمر بها:\n1. clean: تنظيف المخرجات السابقة\n2. compile: ترجمة الكود\n3. test: تشغيل الاختبارات\n4. package: إنشاء ملف JAR/WAR\n5. install: تثبيت الحزمة في المستودع المحلي\n\n## 💡 المفهوم الأساسي\nكل مرحلة تعتمد على التي قبلها. `mvn package` يشمل compile + test تلقائياً.\n\n## 💻 مثال عملي\n```bash\nmvn clean       # يمسح مجلد target\nmvn compile     # يجمع الكود\nmvn test        # يشغل الاختبارات\nmvn package     # ينتج JAR\nmvn install     # يثبت في ~/.m2\n```\n\n## ⚠️ الأخطاء الشائعة\n- تشغيل mvn package دون mvn clean يؤدي لمشاكل caching\n- افتراض أن mvn package يشمل install\n- نسيان أن test يسبق package تلقائياً\n\n## 🧪 جرّب بنفسك\nشغّل mvn clean package في مشروع SpringPath ولاحظ المخرجات.',
        null, null, 20, 3, 10);

-- Lesson 2.4: Spring Boot Starters
INSERT INTO lessons (id, module_id, title, type, content_markdown, code_example, expected_output, duration_minutes, order_index, xp_reward)
VALUES (14, 2, 'Spring Boot Starters', 'THEORY',
E'## 🎯 ما ستتعلمه في هذا الدرس\n- ما هي Spring Boot Starters\n- أهم الـ Starters\n- مفهوم Auto-Configuration\n- Spring Initializr\n\n## 📖 الشرح\nSpring Boot Starters هي "صناديق بداية سريعة". بدلاً من إضافة 10 تبعيات يدوياً، تضيف Starter واحداً يحتويها كلها.\n\nمثل: طلب وجبة #3 من المطعم — تحصل على الوجبة كاملة (برجر + بطاطس + مشروب) بدلاً من طلب كل عنصر على حدة.\n\n## 💡 المفهوم الأساسي\nكل Starter مثل `spring-boot-starter-web` يأتي بمجموعة تبعيات متوافقة وآلية تكوين تلقائي.\n\n## 💻 مثال عملي\n```xml\n<!-- بدلاً من: spring-webmvc + jackson + tomcat كل على حدة -->\n<dependency>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>spring-boot-starter-web</artifactId>\n</dependency>\n```\n\nأهم الـ Starters:\n- starter-web: تطبيقات الويب و REST\n- starter-data-jpa: قواعد البيانات\n- starter-security: الحماية\n- starter-test: الاختبارات\n- starter-validation: التحقق من البيانات\n\n## 🧪 جرّب بنفسك\nراجع ملف pom.xml في المشروع وحدد كل starter مستخدم.',
        null, null, 20, 4, 10);

-- Lesson 2.5: Project Structure
INSERT INTO lessons (id, module_id, title, type, content_markdown, code_example, expected_output, duration_minutes, order_index, xp_reward)
VALUES (15, 2, 'هيكلة مشروع Spring Boot', 'THEORY',
E'## 🎯 ما ستتعلمه في هذا الدرس\n- هيكل المجلدات القياسي\n- مجلدات src/main و src/test\n- application.yml / application.properties\n- مفهوم packages\n\n## 📖 الشرح\nالهيكل الجيد للمشروع هو نصف الإتقان. مثل تنظيم غرفتك: الملابس في الدولاب، الكتب على الرف، الأدوات في الدرج.\n\nSpring Boot يتبع اصطلاحات محددة. إذا اتبعتها، كل شيء يعمل تلقائياً.\n\n## 💡 المفهوم الأساسي\n`src/main/java` = الكود. `src/main/resources` = الإعدادات. `src/test` = الاختبارات.\n\n## 💻 مثال عملي\n```\nsrc/\n├── main/\n│   ├── java/com/example/\n│   │   ├── controller/\n│   │   ├── service/\n│   │   ├── repository/\n│   │   ├── entity/\n│   │   └── DemoApplication.java\n│   └── resources/\n│       ├── application.yml\n│       └── db/migration/\n└── test/\n    └── java/com/example/\n```\n\n## ⚠️ الأخطاء الشائعة\n- وضع application.yml خارج resources\n- عدم اتباع naming conventions\n- خلط controller و service في نفس الملف\n\n## 🧪 جرّب بنفسك\nتصفح هيكل مشروع SpringPath backend ولاحظ كيف نظمت المجلدات.',
        null, null, 20, 5, 10);

-- Lesson 2.6: Environment Profiles
INSERT INTO lessons (id, module_id, title, type, content_markdown, code_example, expected_output, duration_minutes, order_index, xp_reward)
VALUES (16, 2, 'ملفات الإعدادات — application.yml', 'CODE',
E'## 🎯 ما ستتعلمه في هذا الدرس\n- application.yml vs application.properties\n- Spring Profiles (dev, prod)\n- تكوين قاعدة البيانات\n- المتغيرات البيئية (Environment Variables)\n\n## 📖 الشرح\nبرنامجك يحتاج إعدادات مختلفة في بيئات مختلفة. في التطوير (dev) تستخدم H2، في الإنتاج (prod) تستخدم PostgreSQL. كيف تدير هذا دون تغيير الكود؟\n\nSpring Profiles هي الحل. مثل الملابس: في الصيف تلبس خفيفاً، في الشتاء تلبس ثقيلاً — نفس الشخص، تكوين مختلف.\n\n## 💡 المفهوم الأساسي\n`application.yml` = الإعدادات العامة. `application-dev.yml` = إعدادات خاصة بالـ dev profile. `application-prod.yml` = إعدادات الإنتاج.\n\n## 💻 مثال عملي\n```yaml\n# application.yml\nspring:\n  application:\n    name: my-app\n\n---\nspring:\n  config:\n    activate:\n      on-profile: dev\n  datasource:\n    url: jdbc:h2:mem:testdb\n\n---\nspring:\n  config:\n    activate:\n      on-profile: prod\n  datasource:\n    url: jdbc:postgresql://localhost:5432/mydb\n```\n\n## 🧪 جرّب بنفسك\nشغّل مشروع SpringPath بـ dev profile وراقب كيف يستخدم H2 تلقائياً.',
        null, null, 20, 6, 10);

-- =====================================================
-- MODULE 1.3 — Spring Core (7 Lessons)
-- =====================================================
INSERT INTO modules (id, course_id, title, description, order_index, duration_minutes)
VALUES (3, 1, 'Spring Core', 'IoC Container، Dependency Injection، Beans، AOP', 3, 210);

-- Lesson 3.1: What is Spring?
INSERT INTO lessons (id, module_id, title, type, content_markdown, code_example, expected_output, duration_minutes, order_index, xp_reward)
VALUES (17, 3, 'ما هو Spring Framework؟', 'THEORY',
E'## 🎯 ما ستتعلمه في هذا الدرس\n- تاريخ Spring ولماذا ظهر\n- المشكلة التي يحلها Spring\n- الفرق بين Spring و Spring Boot\n- المبادئ الأساسية\n\n## 📖 الشرح\nتخيل أنك تبني منزلاً. قبل Spring، كان عليك صنع كل شيء بنفسك: الطوب، الأسمنت، النوافذ. Spring هو مصنع متكامل يعطيك كل شيء جاهزاً.\n\nSpring يحل مشكلة تعقيد Java EE. بدلاً من كتابة 1000 سطر لإنشاء خدمة ويب بسيطة، Spring يجعلها 10 أسطر.\n\n## 💡 المفهوم الأساسي\nSpring هو "حاوية" تدير كائناتك (Beans) وتنسق بينها (Dependency Injection) بدلاً من أن تديرها بنفسك.\n\n## 💻 مثال عملي\n```java\n// بدون Spring: أنت المسؤول عن كل شيء\nMyService service = new MyService(new MyRepository());\n\n// مع Spring: الحاوية تتولى كل شيء\n@Autowired\nprivate MyService service;\n```\n\n## ⚠️ الأخطاء الشائعة\n- الخلط بين Spring Framework و Spring Boot (Boot يسهّل إعداد Spring)\n- الاعتقاد أن Spring للمشاريع الكبيرة فقط\n- محاولة فهم كل Spring مرة واحدة — ابدأ بالـ Core\n\n## 🧪 جرّب بنفسك\nتصفح SpringPathApplication.java ولاحظ بساطة بدء تطبيق Spring Boot.',
        null, null, 25, 1, 15);

-- Lesson 3.2: IoC Container
INSERT INTO lessons (id, module_id, title, type, content_markdown, code_example, expected_output, duration_minutes, order_index, xp_reward)
VALUES (18, 3, 'حاوية IoC — قلب Spring', 'THEORY',
E'## 🎯 ما ستتعلمه في هذا الدرس\n- ما هو Inversion of Control (IoC)\n- كيف تعمل حاوية Spring\n- ApplicationContext\n- BeanFactory vs ApplicationContext\n\n## 📖 الشرح\nفي البرمجة التقليدية، أنت تتحكم في كل شيء — تنشئ الكائنات، تربطها، تدير دورة حياتها. IoC يقلب هذا: الحاوية هي التي تتحكم.\n\nتخيل مقهى: قبل IoC، أنت تدخل المطبخ وتصنع قهوتك بنفسك. مع IoC، تجلس وتطلب من النادل، وهو يأتيك بالقهوة جاهزة.\n\n## 💡 المفهوم الأساسي\nIoC = لا تنشئ الكائنات بنفسك. اطلبها من الحاوية. الحاوية = المدير الذكي للكائنات.\n\n## 💻 مثال عملي\n```java\n// حاوية Spring هي ApplicationContext\nApplicationContext context = SpringApplication.run(MyApp.class, args);\n\n// تطلب الكائن من الحاوية بدلاً من إنشائه بنفسك\nMyService service = context.getBean(MyService.class);\n```\n\n## ⚠️ الأخطاء الشائعة\n- محاولة إنشاء Beans بـ new بدلاً من ترك الحاوية تديرها\n- عدم فهم أن الحاوية تدير دورة حياة الكائن كاملة\n- الخلط بين BeanFactory و ApplicationContext\n\n## 🧪 جرّب بنفسك\nلاحظ استخدام @Bean و @Component في مشروع SpringPath — هذه هي الطريقة التي تخبر بها الحاوية عن كائناتك.',
        null, null, 25, 2, 15);

-- Lesson 3.3: Dependency Injection
INSERT INTO lessons (id, module_id, title, type, content_markdown, code_example, expected_output, duration_minutes, order_index, xp_reward)
VALUES (19, 3, 'حقن التبعيات — Dependency Injection', 'CODE',
E'## 🎯 ما ستتعلمه في هذا الدرس\n- ما هي Dependency Injection (DI)\n- أنواع الحقن: Constructor, Setter, Field\n- @Autowired\n- فوائد DI\n\n## 📖 الشرح\nكل كائن يحتاج كائنات أخرى ليعمل. الـ Service تحتاج Repository. بدلاً من أن تذهب الـ Service لتصنع Repository بنفسها، يتم "حقن" Repository فيها من الخارج.\n\nتخيل جهاز تحكم عن بعد. يحتاج بطاريات ليعمل. البطاريات "تُحقن" في الجهاز من الخارج. الجهاز لا يصنع بطارياته.\n\n## 💡 المفهوم الأساسي\nDI = لا تبحث عن تبعياتك. دع أحداً يعطيك إياها. هذا يجعل الكود flexible وقابل للاختبار.\n\n## 💻 مثال عملي\n```java\n// بدلاً من هذا:\npublic class OrderService {\n    private OrderRepository repo = new OrderRepository(); // صلب!\n}\n\n// استخدم هذا:\n@Service\npublic class OrderService {\n    private final OrderRepository repo;\n\n    // Constructor Injection — الأفضل\n    public OrderService(OrderRepository repo) {\n        this.repo = repo;\n    }\n}\n```\n\n## ⚠️ الأخطاء الشائعة\n- استخدام Field Injection (@Autowired على الحقل مباشرة) — يجعل الاختبار صعباً\n- Circular Dependency — A يحتاج B و B يحتاج A\n- نسيان @Component/@Service على الكلاس\n\n## 🧪 جرّب بنفسك\nفي مشروع SpringPath، ابحث عن @Service و @Repository — هذه الكلاسات تحقن تلقائياً.',
        E'@Service\npublic class GreetingService {\n    public String greet(String name) {\n        return "مرحباً " + name + "!";\n    }\n}',
        null, 25, 3, 15);

-- Lesson 3.4: Beans
INSERT INTO lessons (id, module_id, title, type, content_markdown, code_example, expected_output, duration_minutes, order_index, xp_reward)
VALUES (20, 3, 'الـ Beans في Spring', 'CODE',
E'## 🎯 ما ستتعلمه في هذا الدرس\n- ما هو الـ Bean\n- @Component, @Service, @Repository, @Controller\n- @Bean method\n- Scope of Beans: Singleton, Prototype\n\n## 📖 الشرح\nالـ Bean هو أي كائن تديره حاوية Spring. مثل العامل في شركة: مسجل في الموارد البشرية، له دور محدد، والشركة تدير وقته وراتبه.\n\nكل @Component/@Service/@Repository هو Bean. الـ Beans تعيش داخل الـ ApplicationContext.\n\n## 💡 المفهوم الأساسي\nBean = كائن تديره Spring.@Component = طريقة مختصرة لتعريف Bean.\n\n## 💻 مثال عملي\n```java\n// الطريقة 1: استخدام Stereotype Annotations\n@Service\npublic class UserService {\n    public String getUser() { return "Ahmed"; }\n}\n\n// الطريقة 2: استخدام @Bean في @Configuration\n@Configuration\npublic class AppConfig {\n    @Bean\n    public PasswordEncoder passwordEncoder() {\n        return new BCryptPasswordEncoder();\n    }\n}\n```\n\n## ⚠️ الأخطاء الشائعة\n- افتراض أن كل الكائنات Beans (الكائنات البسيطة DTOs ليست Beans)\n- نسيان أن @Bean يستخدم فقط داخل @Configuration\n- الخلط بين Singleton scope (افتراضي) ومفهوم Design Pattern Singleton\n\n## 🧪 جرّب بنفسك\nابحث في مشروع SpringPath عن @Configuration و @Bean — مثلاً في SecurityConfig أو ModelMapperConfig.',
        null, null, 25, 4, 15);

-- Lesson 3.5: Annotations Deep Dive
INSERT INTO lessons (id, module_id, title, type, content_markdown, code_example, expected_output, duration_minutes, order_index, xp_reward)
VALUES (21, 3, 'شرح التعليقات الأساسية', 'THEORY',
E'## 🎯 ما ستتعلمه في هذا الدرس\n- @SpringBootApplication\n- @RestController vs @Controller\n- @RequestMapping, @GetMapping, @PostMapping\n- @RequestBody, @PathVariable, @RequestParam\n\n## 📖 الشرح\nالتعليقات (Annotations) هي تعليمات تخبر Spring كيف يتصرف. مثل الملصقات على الصناديق: "هذا قابل للكسر"، "هذا الجانب للأعلى".\n\n@GetMapping = هذا الدالة تستجيب لـ GET request. @RequestBody = خذ البيانات من جسم الطلب.\n\n## 💡 المفهوم الأساسي\nالتعليقات تضيف metadata لـ Spring. هي طريقة مختصرة للإعداد بدلاً من كتابة XML.\n\n## 💻 مثال عملي\n```java\n@RestController\n@RequestMapping("/api/users")\npublic class UserController {\n\n    @GetMapping("/{id}")\n    public User getUser(@PathVariable Long id) {\n        return userService.findById(id);\n    }\n\n    @PostMapping\n    public User createUser(@RequestBody @Valid UserDto dto) {\n        return userService.create(dto);\n    }\n}\n```\n\n## ⚠️ الأخطاء الشائعة\n- نسيان @RequestBody — البيانات لا تصل\n- خلط @PathVariable و @RequestParam\n- نسيان @Valid — التحقق لا يعمل\n\n## 🧪 جرّب بنفسك\nراجع الكنترولرات المخطط لها في مشروع SpringPath (في مجلد controller) وحدد التعليقات المستخدمة.',
        null, null, 25, 5, 15);

-- Lesson 3.6: RestTemplate & HTTP
INSERT INTO lessons (id, module_id, title, type, content_markdown, code_example, expected_output, duration_minutes, order_index, xp_reward)
VALUES (22, 3, 'التواصل عبر HTTP في Spring', 'CODE',
E'## 🎯 ما ستتعلمه في هذا الدرس\n- RestTemplate (قديم) vs WebClient (جديد)\n- إرسال GET و POST requests\n- معالجة الـ response\n- error handling\n\n## 📖 الشرح\nتطبيقك لا يعيش في عزلة. يحتاج التواصل مع خدمات أخرى. مثل هاتفك: يتصل بالإنترنت للحصول على معلومات.\n\nSpring يوفر أدوات للتواصل HTTP. RestTemplate سهل الاستخدام، WebClient حديث وغير متزامن.\n\n## 💡 المفهوم الأساسي\nRestTemplate هو عميل HTTP في Spring. يرسل طلبات ويستقبل ردود.\n\n## 💻 مثال عملي\n```java\n@Service\npublic class ApiClient {\n    private final RestTemplate restTemplate;\n\n    public ApiClient(RestTemplateBuilder builder) {\n        this.restTemplate = builder.build();\n    }\n\n    public String fetchData(String url) {\n        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);\n        return response.getBody();\n    }\n}\n```\n\n## ⚠️ الأخطاء الشائعة\n- عدم إغلاق الـ connections\n- نسيان timeout configuration\n- عدم التعامل مع أخطاء HTTP (4xx, 5xx)\n\n## 🧪 جرّب بنفسك\nفي المشروع، سنستخدم RestTemplate لاحقاً في CodeRunner للتواصل بين الخدمات.',
        null, null, 25, 6, 15);

-- Lesson 3.7: Configuration Properties
INSERT INTO lessons (id, module_id, title, type, content_markdown, code_example, expected_output, duration_minutes, order_index, xp_reward)
VALUES (23, 3, 'إدارة الإعدادات — @ConfigurationProperties', 'CODE',
E'## 🎯 ما ستتعلمه في هذا الدرس\n- @ConfigurationProperties\n- @Value\n- Type-safe configuration\n- YAML vs Properties\n\n## 📖 الشرح\nبدلاً من وضع الإعدادات داخل الكود (hardcoded)، ضعها في application.yml واستخدم @ConfigurationProperties لقراءتها بشكل آمن.\n\nفكر فيها كجهاز تحكم مركزي: تغير الإعدادات في مكان واحد، وينعكس التغيير في كل مكان.\n\n## 💡 المفهوم الأساسي\n@ConfigurationProperties تربط إعدادات application.yml بكائن Java بشكل type-safe.\n\n## 💻 مثال عملي\n```java\n@Configuration\n@ConfigurationProperties(prefix = "app.jwt")\npublic class JwtConfig {\n    private String secret;\n    private long accessTokenExpiry;\n    // getters and setters\n}\n```\n```yaml\n# application.yml\napp:\n  jwt:\n    secret: my-secret-key\n    access-token-expiry: 900000\n```\n\n## ⚠️ الأخطاء الشائعة\n- نسيان getters/setters (spring يستخدمهم)\n- عدم تطابق اسم الخاصية بين Java و YAML\n- استخدام @Value بدلاً من ConfigurationProperties للكثير من القيم\n\n## 🧪 جرّب بنفسك\nلاحظ JwtConfig.java في مشروع SpringPath — يستخدم ConfigurationProperties لقراءة إعدادات JWT.',
        null, null, 25, 7, 15);

-- =====================================================
-- QUIZ QUESTIONS (3 per lesson, 69 total for Phase 1)
-- =====================================================

-- Lesson 1 Quizzes
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (1, 'ما هو JVM؟', 'MCQ',
        '["محرر نصوص", "آلة افتراضية تشغل برامج Java", "متصفح ويب", "قاعدة بيانات"]',
        'آلة افتراضية تشغل برامج Java', 'JVM = Java Virtual Machine. هي التي تشغل bytecode.', 1);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (1, 'الدالة الرئيسية في Java هي: public static void main(String[] args)', 'TRUE_FALSE', NULL,
        'true', 'نعم، هذه هي نقطة البداية لأي برنامج Java.', 2);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (1, 'ماذا تطبع الجملة التالية: System.out.println("Hello");', 'CODE_OUTPUT', NULL,
        'Hello', 'System.out.println تطبع النص وتنتقل لسطر جديد.', 3);

-- Lesson 2 Quizzes
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (2, 'أي نوع بيانات يستخدم للأعداد الصحيحة في Java؟', 'MCQ',
        '["String", "double", "int", "boolean"]',
        'int', 'int هو النوع المخصص للأعداد الصحيحة.', 1);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (2, 'يمكن تخزين النص "Hello" في متغير من نوع int', 'TRUE_FALSE', NULL,
        'false', 'النص يُخزن في String وليس int.', 2);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (2, 'ماذا يطبع: int x = 5; System.out.println(x + 3);', 'CODE_OUTPUT', NULL,
        '8', 'عملية الجمع: 5 + 3 = 8', 3);

-- Lesson 3 Quizzes
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (3, 'ما نتيجة: 10 % 3', 'MCQ',
        '["3", "1", "0", "10"]',
        '1', 'باقي قسمة 10 ÷ 3 = 1.', 1);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (3, 'الرمز && يعني "أو" المنطقية', 'TRUE_FALSE', NULL,
        'false', '&& = AND المنطقية. || = OR المنطقية.', 2);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (3, 'ماذا يطبع: (5 > 3) && (2 < 1)', 'CODE_OUTPUT', NULL,
        'false', 'الجزء الثاني (2 < 1) false، لذا الكل false.', 3);

-- Lesson 4 Quizzes
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (4, 'ماذا يطبع: int x = 10; if (x < 5) { System.out.print("A"); } else { System.out.print("B"); }', 'CODE_OUTPUT', NULL,
        'B', 'الشرط x < 5 خطأ (10 ليس أقل من 5)، فينفذ else ويطبع B.', 1);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (4, 'نستخدم else if عندما نريد اختبار شرط إضافي بعد فشل الشرط الأول', 'TRUE_FALSE', NULL,
        'true', 'else if يسمح باختبار شروط متعددة.', 2);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (4, 'ما الفرق بين = و == في Java؟', 'MCQ',
        '["لا يوجد فرق", "= تعيين، == مقارنة", "= مقارنة، == تعيين", "كلاهما للمقارنة"]',
        '= تعيين، == مقارنة', '= يعطي قيمة للمتغير. == يقارن بين قيمتين.', 3);

-- Lesson 5 Quizzes
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (5, 'كم مرة تنفذ: for (int i = 0; i < 3; i++) {}', 'MCQ',
        '["2", "3", "4", "1"]',
        '3', 'i يبدأ من 0: 0, 1, 2 = ثلاث مرات.', 1);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (5, 'حلقة while قد لا تنفذ أبداً إذا كان الشرط false من البداية', 'TRUE_FALSE', NULL,
        'true', 'while تتحقق من الشرط قبل التنفيذ.', 2);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (5, 'ماذا تفعل break في حلقة؟', 'MCQ',
        '["تتخطى التكرار الحالي", "تخرج من الحلقة تماماً", "تعيد تشغيل الحلقة", "لا تفعل شيئاً"]',
        'تخرج من الحلقة تماماً', 'break توقف الحلقة فوراً وتخرج منها.', 3);

-- Lesson 6 Quizzes
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (6, 'ما هو index أول عنصر في مصفوفة Java؟', 'MCQ',
        '["1", "0", "-1", "null"]',
        '0', 'المصفوفات تبدأ دائماً من index 0 في Java.', 1);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (6, 'المصفوفة في Java يمكن تغيير حجمها بعد إنشائها', 'TRUE_FALSE', NULL,
        'false', 'المصفوفات لها حجم ثابت. لتغيير الحجم استخدم ArrayList.', 2);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (6, 'ماذا يطبع: int[] arr = {1,2,3}; System.out.println(arr.length);', 'CODE_OUTPUT', NULL,
        '3', 'length تعطي عدد عناصر المصفوفة = 3.', 3);

-- Lesson 7 Quizzes
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (7, 'ماذا تعني void في تعريف الدالة؟', 'MCQ',
        '["ترجع null", "لا ترجع أي قيمة", "ترجع 0", "ترجع void"]',
        'لا ترجع أي قيمة', 'void = الدالة تنفذ شيئاً ولا تعيد نتيجة.', 1);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (7, 'الدالة التي ترجع قيمة يجب أن تحتوي على جملة return', 'TRUE_FALSE', NULL,
        'true', 'أي دالة غير void يجب أن تنتهي بـ return.', 2);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (7, 'ماذا يطبع: public static int doubleIt(int n) { return n * 2; } ثم doubleIt(5)', 'CODE_OUTPUT', NULL,
        '10', 'الدالة تضرب العدد في 2: 5 × 2 = 10', 3);

-- Lesson 8 Quizzes
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (8, 'ما الفرق بين class و object؟', 'MCQ',
        '["لا فرق", "class قالب، object مثيل", "object قالب، class مثيل", "كلاهما قالب"]',
        'class قالب، object مثيل', 'class هو المخطط. object هو الشيء الفعلي.', 1);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (8, 'لإنشاء كائن جديد من كلاس Student نستخدم: Student s = Student()', 'TRUE_FALSE', NULL,
        'false', 'يجب استخدام new: Student s = new Student();', 2);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (8, 'ماذا تسمى المتغيرات داخل class؟', 'MCQ',
        '["Methods", "Fields / Properties", "Parameters", "Arguments"]',
        'Fields / Properties', 'المتغيرات داخل الكلاس تسمى fields أو properties.', 3);

-- Lesson 9 Quizzes
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (9, 'أي block ينفذ دائماً سواء حدث خطأ أم لا؟', 'MCQ',
        '["try", "catch", "finally", "throw"]',
        'finally', 'finally ينفذ في كل الحالات — مع أو بدون خطأ.', 1);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (9, 'catch (Exception e) يمسك أي نوع من الاستثناءات', 'TRUE_FALSE', NULL,
        'true', 'Exception هي الفئة الأب لكل الاستثناءات.', 2);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (9, 'ماذا يحدث لو حدث خطأ ولم يوجد catch؟', 'MCQ',
        '["يتجاهل البرنامج الخطأ", "ينهار البرنامج ويتوقف", "يعيد المحاولة", "لا شيء"]',
        'ينهار البرنامج ويتوقف', 'الاستثناء غير المعالج يوقف البرنامج.', 3);

-- Lesson 10 Quizzes
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (10, 'ما الدالة المستخدمة لإضافة عنصر لـ ArrayList؟', 'MCQ',
        '["add()", "put()", "insert()", "append()"]',
        'add()', 'لإضافة عنصر: list.add(element);', 1);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (10, 'ArrayList يمكن أن يحتوي على أنواع مختلفة في نفس القائمة', 'TRUE_FALSE', NULL,
        'false', 'ArrayList محدد النوع باستخدام Generics: ArrayList<String>.', 2);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (10, 'ماذا ترجع: list.size() عندما تكون القائمة فارغة؟', 'CODE_OUTPUT', NULL,
        '0', 'size() ترجع صفر للقائمة الفارغة.', 3);

-- Lesson 11 Quizzes
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (11, 'ما هي وظيفة أداة البناء؟', 'MCQ',
        '["كتابة الكود", "تجميع الكود وإدارة التبعيات", "تصميم واجهات", "إدارة قاعدة البيانات"]',
        'تجميع الكود وإدارة التبعيات', 'أدوات البناء تجمع الكود وتدير المكتبات.', 1);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (11, 'Maven هي أداة بناء لمشاريع Java', 'TRUE_FALSE', NULL,
        'true', 'Maven من أشهر أدوات البناء في عالم Java.', 2);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (11, 'ماذا تعني كلمة "تبعية" (Dependency)؟', 'MCQ',
        '["خطأ في الكود", "مكتبة خارجية يحتاجها المشروع", "ملف إعدادات", "نوع من المتغيرات"]',
        'مكتبة خارجية يحتاجها المشروع', 'التبعية هي كود خارجي يستخدمه مشروعك.', 3);

-- Lesson 12 Quizzes
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (12, 'ماذا ترمز GAV في Maven؟', 'MCQ',
        '["General Audio Video", "groupId, artifactId, version", "Gradle Ant Validator", "Generate Archive Verify"]',
        'groupId, artifactId, version', 'GAV تحدد هوية المكتبة: من أنشأها، اسمها، وإصدارها.', 1);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (12, 'ملف pom.xml هو اختصار لـ Project Object Model', 'TRUE_FALSE', NULL,
        'true', 'POM = Project Object Model. وهو قلب مشروع Maven.', 2);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (12, 'أين تُعرَّف تبعيات المشروع في pom.xml؟', 'MCQ',
        '["داخل <build>", "داخل <dependencies>", "داخل <properties>", "داخل <plugins>"]',
        'داخل <dependencies>', 'كل التبعيات تعرف داخل وسم <dependencies>.', 3);

-- Lesson 13 Quizzes
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (13, 'ما الأمر الذي ينتج ملف JAR؟', 'MCQ',
        '["mvn compile", "mvn test", "mvn package", "mvn clean"]',
        'mvn package', 'mvn package يجمع ويحزم المشروع في JAR.', 1);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (13, 'mvn package يشمل تشغيل الاختبارات تلقائياً', 'TRUE_FALSE', NULL,
        'true', 'package تعتمد على test. إذا فشلت الاختبارات، لا يتم الـ package.', 2);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (13, 'ماذا يفعل mvn clean؟', 'MCQ',
        '["ينظف قاعدة البيانات", "يمسح مجلد target", "يعيد تشغيل الخادم", "يحذف التبعيات"]',
        'يمسح مجلد target', 'mvn clean يمسح المخرجات السابقة للبناء.', 3);

-- Lesson 14 Quizzes
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (14, 'ما فائدة Spring Boot Starter؟', 'MCQ',
        '["بدء تشغيل الخادم", "تجميع مجموعة تبعيات متوافقة", "إنشاء قاعدة بيانات", "كتابة الاختبارات"]',
        'تجميع مجموعة تبعيات متوافقة', 'الـ Starter يضم عدة تبعيات متوافقة في حزمة واحدة.', 1);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (14, 'spring-boot-starter-web يضيف Tomcat تلقائياً', 'TRUE_FALSE', NULL,
        'true', 'starter-web يتضمن Tomcat المضمن (embedded Tomcat).', 2);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (14, 'أي starter يستخدم للتعامل مع قواعد البيانات؟', 'MCQ',
        '["starter-web", "starter-security", "starter-data-jpa", "starter-test"]',
        'starter-data-jpa', 'starter-data-jpa يتضمن Hibernate و Spring Data JPA.', 3);

-- Lesson 15 Quizzes
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (15, 'أين يوضع application.yml في مشروع Spring Boot؟', 'MCQ',
        '["src/main/java", "src/main/resources", "src/test", "المجلد الرئيسي"]',
        'src/main/resources', 'ملفات الإعدادات توضع في resources.', 1);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (15, 'مجلد src/test يحتوي على كود الإنتاج', 'TRUE_FALSE', NULL,
        'false', 'src/test خاص بالاختبارات فقط.', 2);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (15, 'ما وظيفة packages في Java؟', 'MCQ',
        '["تشفير الكود", "تنظيم الكود في مجموعات", "تسريع التنفيذ", "ضغط الملفات"]',
        'تنظيم الكود في مجموعات', 'الـ packages تنظم الكلاسات في هيكل شجري.', 3);

-- Lesson 16 Quizzes
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (16, 'كيف تغير الإعدادات بين بيئة التطوير والإنتاج؟', 'MCQ',
        '["تغيير الكود يدوياً", "استخدام Spring Profiles", "حذف ملف الإعدادات", "إعادة تشغيل الخادم"]',
        'استخدام Spring Profiles', 'الـ Profiles تسمح بإعدادات مختلفة لكل بيئة.', 1);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (16, 'يمكن استخدام application.yml بدلاً من application.properties', 'TRUE_FALSE', NULL,
        'true', 'YAML أكثر قابلية للقراءة من properties.', 2);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (16, 'ما هي environment variables؟', 'MCQ',
        '["متغيرات داخل الكود", "قيم تُمرر للنظام من الخارج", "نوع من الـ Beans", "ملفات مؤقتة"]',
        'قيم تُمرر للنظام من الخارج', 'مثل DB_PASSWORD أو JWT_SECRET — قيم حساسة من البيئة.', 3);

-- Lesson 17 Quizzes
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (17, 'ما المشكلة الأساسية التي يحلها Spring؟', 'MCQ',
        '["بطء Java", "تعقيد Java EE", "عدم وجود قواعد بيانات", "صعوبة كتابة HTML"]',
        'تعقيد Java EE', 'Spring ظهر لتبسيط تطوير تطبيقات Java المؤسسية.', 1);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (17, 'Spring Boot هو امتداد لـ Spring Framework يسهل الإعداد', 'TRUE_FALSE', NULL,
        'true', 'Spring Boot = Spring Framework + Auto-Configuration + Embedded Server.', 2);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (17, 'ما هو مبدأ IoC؟', 'MCQ',
        '["البرنامج يتحكم في كل شيء", "الحاوية تتحكم في الكائنات بدلاً منك", "كتابة كود أقل", "استخدام XML"]',
        'الحاوية تتحكم في الكائنات بدلاً منك', 'IoC = قلب السيطرة. الحاوية تدير الكائنات.', 3);

-- Lesson 18 Quizzes
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (18, 'ما هو ApplicationContext في Spring؟', 'MCQ',
        '["ملف إعدادات", "حاوية Spring التي تدير Beans", "مكتبة خارجية", "واجهة مستخدم"]',
        'حاوية Spring التي تدير Beans', 'ApplicationContext هو قلب Spring — يدير الكائنات.', 1);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (18, 'IoC تعني أن الكود هو الذي يتحكم في إنشاء الكائنات', 'TRUE_FALSE', NULL,
        'false', 'IoC تعني العكس: الحاوية هي التي تتحكم.', 2);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (18, 'ما الفرق بين BeanFactory و ApplicationContext؟', 'MCQ',
        '["لا فرق", "ApplicationContext نسخة متقدمة من BeanFactory", "BeanFactory أحدث", "كلاهما للإعدادات"]',
        'ApplicationContext نسخة متقدمة من BeanFactory', 'ApplicationContext يضيف AOP و i18n وغيرها.', 3);

-- Lesson 19 Quizzes
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (19, 'ما أفضل نوع من Dependency Injection؟', 'MCQ',
        '["Field Injection", "Constructor Injection", "Setter Injection", "كلها متساوية"]',
        'Constructor Injection', 'Constructor Injection يجعل التبعيات واضحة ويسهل الاختبار.', 1);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (19, '@Autowired يستخدم للحقن التلقائي للتبعيات', 'TRUE_FALSE', NULL,
        'true', '@Autowired يخبر Spring بحقن التبعية تلقائياً.', 2);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (19, 'ماذا يحدث لو كان هناك Circular Dependency؟', 'MCQ',
        '["يعمل البرنامج طبيعياً", "يفشل بدء التطبيق", "يتجاهل Spring المشكلة", "يتم حلها تلقائياً"]',
        'يفشل بدء التطبيق', 'التبعية الدائرية تسبب BeanCurrentlyInCreationException.', 3);

-- Lesson 20 Quizzes
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (20, 'ما هو الـ scope الافتراضي للـ Bean في Spring؟', 'MCQ',
        '["Prototype", "Singleton", "Request", "Session"]',
        'Singleton', 'الـ Beans في Spring Singleton افتراضياً — كائن واحد في الحاوية.', 1);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (20, 'التعليق @Service هو نوع من @Component', 'TRUE_FALSE', NULL,
        'true', '@Service و @Repository و @Controller كلها Stereotypes مشتقة من @Component.', 2);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (20, 'متى تستخدم @Bean بدلاً من @Component؟', 'MCQ',
        '["دائماً", "عندما تريد تعريف Bean من مكتبة خارجية", "للمتغيرات فقط", "للاختبارات فقط"]',
        'عندما تريد تعريف Bean من مكتبة خارجية', '@Bean يستخدم في @Configuration لتعريف Beans لا تملك كودها.', 3);

-- Lesson 21 Quizzes
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (21, 'ما الفرق بين @Controller و @RestController؟', 'MCQ',
        '["لا فرق", "RestController يضيف @ResponseBody تلقائياً", "Controller أحدث", "RestController للـ GET فقط"]',
        'RestController يضيف @ResponseBody تلقائياً', 'RestController = Controller + ResponseBody — للـ REST APIs.', 1);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (21, '@GetMapping يستخدم لطلبات POST', 'TRUE_FALSE', NULL,
        'false', '@GetMapping لـ GET. @PostMapping لـ POST.', 2);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (21, 'ماذا يفعل @PathVariable؟', 'MCQ',
        '["يقرأ من جسم الطلب", "يقرأ من المسار", "يقرأ من البارامترات", "يقرأ من الهيدر"]',
        'يقرأ من المسار', '@PathVariable يستخرج قيمة من مسار URL.', 3);

-- Lesson 22 Quizzes
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (22, 'ما الأداة المستخدمة للتواصل HTTP في Spring؟', 'MCQ',
        '["HttpClient", "RestTemplate", "WebBrowser", "HttpConnector"]',
        'RestTemplate', 'RestTemplate هو عميل HTTP المتزامن في Spring.', 1);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (22, 'RestTemplate يدعم الطلبات غير المتزامنة (async)', 'TRUE_FALSE', NULL,
        'false', 'RestTemplate متزامن. للطلبات غير المتزامنة استخدم WebClient.', 2);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (22, 'ماذا يحدث لو أرسلت طلب GET لموقع غير موجود؟', 'MCQ',
        '["يعيد null", "يرمي RestClientException", "يعيد صفحة فارغة", "يتجاهل الخطأ"]',
        'يرمي RestClientException', 'الأخطاء في HTTP تتحول لـ RestClientException.', 3);

-- Lesson 23 Quizzes
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (23, 'ماذا يفعل @ConfigurationProperties؟', 'MCQ',
        '["ينشئ Beans", "يربط الإعدادات بكائن Java", "يشغل الاختبارات", "يبني قاعدة البيانات"]',
        'يربط الإعدادات بكائن Java', 'يربط قيم application.yml بكائن Java بشكل type-safe.', 1);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (23, '@Value يقرأ قيمة واحدة من application.yml', 'TRUE_FALSE', NULL,
        'true', '@Value("${property}") يقرأ قيمة محددة.', 2);
INSERT INTO quiz_questions (lesson_id, question, type, options, correct_answer, explanation, order_index)
VALUES (23, 'تحتاج @ConfigurationProperties إلى getters و setters', 'TRUE_FALSE', NULL,
        'true', 'Spring يستخدم getters/setters لربط القيم.', 3);
-- ✅ V2__seed.sql — Phase 1 seed data complete
