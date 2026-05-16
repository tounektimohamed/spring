package com.springpath.config;

import com.springpath.entity.Course;
import com.springpath.entity.Lesson;
import com.springpath.entity.Module;
import com.springpath.entity.QuizQuestion;
import com.springpath.enums.*;
import com.springpath.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Profile("!test")
public class DataInitializer implements CommandLineRunner {

    private final CourseRepository courseRepository;
    private final com.springpath.repository.ModuleRepository moduleRepository;
    private final LessonRepository lessonRepository;
    private final QuizQuestionRepository quizQuestionRepository;

    @Override
    @Transactional
    public void run(String... args) {
        if (courseRepository.count() > 0) return;

        // Phase 1 Course
        Course phase1 = Course.builder()
                .slug("phase-1-foundation")
                .title("المرحلة الأولى: الأساس")
                .description("Java + Spring Core من الصفر")
                .level(CourseLevel.BEGINNER)
                .color("#22D3EE")
                .icon("\uD83D\uDFE2")
                .orderIndex(1)
                .isPublished(true)
                .build();
        phase1 = courseRepository.save(phase1);

        // Module 1.1 — Java Essentials
        Module m1 = createModule(phase1, "أساسيات Java", "المتغيرات، الشروط، الحلقات، الدوال، OOP، الاستثناءات، والمجموعات", 1, 240);
        createLesson(m1, "ما هي Java؟ — مدخل إلى عالم البرمجة", LessonType.THEORY, javaIntroContent, null, null, 20, 1, 10);
        createLesson(m1, "المتغيرات وأنواع البيانات", LessonType.CODE, variablesContent, "public class Main { public static void main(String[] args) { int age = 25; String name = \"أحمد\"; System.out.println(\"الاسم: \" + name); System.out.println(\"العمر: \" + age); } }", "الاسم: أحمد\nالعمر: 25", 25, 2, 10);
        createLesson(m1, "المعاملات والتعابير الحسابية", LessonType.CODE, operatorsContent, "public class Main { public static void main(String[] args) { int a = 10, b = 3; System.out.println(a + \" + \" + b + \" = \" + (a + b)); System.out.println(a + \" * \" + b + \" = \" + (a * b)); } }", "10 + 3 = 13\n10 * 3 = 30", 25, 3, 10);
        createLesson(m1, "الشروط — if, else if, else", LessonType.CODE, conditionalsContent, "public class Main { public static void main(String[] args) { int number = 7; if (number % 2 == 0) { System.out.println(number + \" عدد زوجي\"); } else { System.out.println(number + \" عدد فردي\"); } } }", "7 عدد فردي", 25, 4, 10);
        createLesson(m1, "الحلقات التكرارية — for و while", LessonType.CODE, loopsContent, "public class Main { public static void main(String[] args) { for (int i = 1; i <= 5; i++) { System.out.println(\"السطر \" + i); } } }", "السطر 1\nالسطر 2\nالسطر 3\nالسطر 4\nالسطر 5", 25, 5, 10);
        createLesson(m1, "المصفوفات — Arrays", LessonType.CODE, arraysContent, "public class Main { public static void main(String[] args) { String[] names = {\"أحمد\", \"سارة\", \"محمد\"}; for (String name : names) { System.out.println(name); } } }", "أحمد\nسارة\nمحمد", 20, 6, 10);
        createLesson(m1, "الدوال — Methods", LessonType.CODE, methodsContent, "public class Main { public static int doubleIt(int n) { return n * 2; } public static void main(String[] args) { System.out.println(doubleIt(5)); } }", "10", 25, 7, 10);
        createLesson(m1, "مقدمة إلى OOP — الكلاسات والكائنات", LessonType.THEORY, oopContent, null, null, 30, 8, 10);
        createLesson(m1, "معالجة الاستثناءات — try-catch", LessonType.CODE, exceptionsContent, "public class Main { public static void main(String[] args) { try { int result = 10 / 0; } catch (ArithmeticException e) { System.out.println(\"لا يمكن القسمة على صفر\"); } } }", "لا يمكن القسمة على صفر", 20, 9, 10);
        createLesson(m1, "المجموعات — ArrayList", LessonType.CODE, arraylistContent, "import java.util.ArrayList; public class Main { public static void main(String[] args) { ArrayList<String> list = new ArrayList<>(); list.add(\"تفاح\"); list.add(\"موز\"); System.out.println(list.size()); } }", "2", 20, 10, 10);

        // Module 1.2 — Build Tools
        Module m2 = createModule(phase1, "أدوات البناء", "Maven, Gradle, إدارة التبعيات، هيكلة المشروع", 2, 150);
        createLesson(m2, "ما هي أدوات البناء؟", LessonType.THEORY, buildToolsContent, null, null, 20, 1, 10);
        createLesson(m2, "فهم Maven و pom.xml", LessonType.CODE, mavenContent, null, null, 20, 2, 10);
        createLesson(m2, "دورة حياة Maven — Lifecycle", LessonType.THEORY, lifecycleContent, null, null, 20, 3, 10);
        createLesson(m2, "Spring Boot Starters", LessonType.THEORY, startersContent, null, null, 20, 4, 10);
        createLesson(m2, "هيكلة مشروع Spring Boot", LessonType.THEORY, structureContent, null, null, 20, 5, 10);
        createLesson(m2, "ملفات الإعدادات — application.yml", LessonType.CODE, configContent, null, null, 20, 6, 10);

        // Module 1.3 — Spring Core
        Module m3 = createModule(phase1, "Spring Core", "IoC Container، Dependency Injection، Beans، AOP", 3, 210);
        createLesson(m3, "ما هو Spring Framework؟", LessonType.THEORY, springIntroContent, null, null, 25, 1, 15);
        createLesson(m3, "حاوية IoC — قلب Spring", LessonType.THEORY, iocContent, null, null, 25, 2, 15);
        createLesson(m3, "حقن التبعيات — Dependency Injection", LessonType.CODE, diContent, null, null, 25, 3, 15);
        createLesson(m3, "الـ Beans في Spring", LessonType.CODE, beansContent, null, null, 25, 4, 15);
        createLesson(m3, "شرح التعليقات الأساسية", LessonType.THEORY, annotationsContent, null, null, 25, 5, 15);
        createLesson(m3, "التواصل عبر HTTP في Spring", LessonType.CODE, httpContent, null, null, 25, 6, 15);
        createLesson(m3, "إدارة الإعدادات — @ConfigurationProperties", LessonType.CODE, configPropsContent, null, null, 25, 7, 15);

        seedQuizzes();
    }

    private com.springpath.entity.Module createModule(Course course, String title, String desc, int order, int duration) {
        com.springpath.entity.Module m = com.springpath.entity.Module.builder()
                .course(course).title(title).description(desc)
                .orderIndex(order).durationMinutes(duration).build();
        return moduleRepository.save(m);
    }

    private void createLesson(com.springpath.entity.Module module, String title, LessonType type, String content,
                               String codeExample, String expectedOutput, int duration, int order, int xp) {
        Lesson lesson = Lesson.builder()
                .module(module).title(title).type(type)
                .contentMarkdown(content).codeExample(codeExample)
                .expectedOutput(expectedOutput)
                .durationMinutes(duration).orderIndex(order).xpReward(xp).build();
        lessonRepository.save(lesson);
    }

    private void seedQuizzes() {
        createQuiz(1L, "ما هو JVM؟", QuizType.MCQ, "[\"محرر نصوص\", \"آلة افتراضية تشغل برامج Java\", \"متصفح ويب\", \"قاعدة بيانات\"]", "آلة افتراضية تشغل برامج Java", "JVM = Java Virtual Machine", 1);
        createQuiz(1L, "الدالة الرئيسية في Java هي: public static void main(String[] args)", QuizType.TRUE_FALSE, null, "true", "نعم، هذه هي نقطة البداية لأي برنامج Java.", 2);
        createQuiz(1L, "ماذا تطبع: System.out.println(\"Hello\");", QuizType.CODE_OUTPUT, null, "Hello", "System.out.println تطبع النص.", 3);

        createQuiz(2L, "أي نوع بيانات يستخدم للأعداد الصحيحة في Java؟", QuizType.MCQ, "[\"String\", \"double\", \"int\", \"boolean\"]", "int", "int هو النوع المخصص للأعداد الصحيحة.", 1);
        createQuiz(2L, "يمكن تخزين النص 'Hello' في متغير من نوع int", QuizType.TRUE_FALSE, null, "false", "النص يُخزن في String وليس int.", 2);
        createQuiz(2L, "ماذا يطبع: int x = 5; System.out.println(x + 3);", QuizType.CODE_OUTPUT, null, "8", "عملية الجمع: 5 + 3 = 8", 3);

        createQuiz(3L, "ما نتيجة: 10 % 3", QuizType.MCQ, "[\"3\", \"1\", \"0\", \"10\"]", "1", "باقي قسمة 10 ÷ 3 = 1.", 1);
        createQuiz(3L, "الرمز && يعني 'أو' المنطقية", QuizType.TRUE_FALSE, null, "false", "&& = AND. || = OR.", 2);
        createQuiz(3L, "ماذا يطبع: (5 > 3) && (2 < 1)", QuizType.CODE_OUTPUT, null, "false", "الجزء الثاني false، لذا الكل false.", 3);

        createQuiz(4L, "ماذا يطبع: int x = 10; if (x < 5) { System.out.print(\"A\"); } else { System.out.print(\"B\"); }", QuizType.CODE_OUTPUT, null, "B", "الشرط خطأ، فينفذ else.", 1);
        createQuiz(4L, "نستخدم else if لاختبار شرط إضافي بعد فشل الأول", QuizType.TRUE_FALSE, null, "true", "else if يسمح باختبار شروط متعددة.", 2);
        createQuiz(4L, "ما الفرق بين = و == في Java؟", QuizType.MCQ, "[\"لا يوجد فرق\", \"= تعيين، == مقارنة\", \"= مقارنة، == تعيين\", \"كلاهما للمقارنة\"]", "= تعيين، == مقارنة", "= يعطي قيمة. == يقارن.", 3);

        createQuiz(5L, "كم مرة تنفذ: for (int i = 0; i < 3; i++) {}", QuizType.MCQ, "[\"2\", \"3\", \"4\", \"1\"]", "3", "i يبدأ من 0: 0, 1, 2 = ثلاث مرات.", 1);
        createQuiz(5L, "حلقة while قد لا تنفذ أبداً إذا كان الشرط false", QuizType.TRUE_FALSE, null, "true", "while تتحقق من الشرط قبل التنفيذ.", 2);
        createQuiz(5L, "ماذا تفعل break في حلقة؟", QuizType.MCQ, "[\"تتخطى التكرار\", \"تخرج من الحلقة\", \"تعيد التشغيل\", \"لا تفعل شيئاً\"]", "تخرج من الحلقة", "break توقف الحلقة فوراً.", 3);

        createQuiz(6L, "ما هو index أول عنصر في مصفوفة Java؟", QuizType.MCQ, "[\"1\", \"0\", \"-1\", \"null\"]", "0", "المصفوفات تبدأ من index 0.", 1);
        createQuiz(6L, "المصفوفة يمكن تغيير حجمها بعد إنشائها", QuizType.TRUE_FALSE, null, "false", "المصفوفات حجمها ثابت.", 2);
        createQuiz(6L, "ماذا يطبع: int[] arr = {1,2,3}; System.out.println(arr.length);", QuizType.CODE_OUTPUT, null, "3", "length = 3 عناصر.", 3);

        createQuiz(7L, "ماذا تعني void في تعريف الدالة؟", QuizType.MCQ, "[\"ترجع null\", \"لا ترجع قيمة\", \"ترجع 0\", \"ترجع void\"]", "لا ترجع قيمة", "void = لا تعيد نتيجة.", 1);
        createQuiz(7L, "الدالة التي ترجع قيمة يجب أن تحتوي على return", QuizType.TRUE_FALSE, null, "true", "أي دالة غير void تنتهي بـ return.", 2);
        createQuiz(7L, "ماذا يطبع: doubleIt(5) حيث doubleIt(n) = n*2", QuizType.CODE_OUTPUT, null, "10", "5 × 2 = 10", 3);

        createQuiz(8L, "ما الفرق بين class و object؟", QuizType.MCQ, "[\"لا فرق\", \"class قالب، object مثيل\", \"object قالب\", \"كلاهما قالب\"]", "class قالب، object مثيل", "class هو المخطط.", 1);
        createQuiz(8L, "لإنشاء كائن جديد نستخدم: new ClassName()", QuizType.TRUE_FALSE, null, "true", "نعم، new تنشئ كائناً.", 2);
        createQuiz(8L, "ماذا تسمى المتغيرات داخل class؟", QuizType.MCQ, "[\"Methods\", \"Fields\", \"Parameters\", \"Arguments\"]", "Fields", "المتغيرات داخل الكلاس تسمى fields.", 3);

        createQuiz(9L, "أي block ينفذ دائماً؟", QuizType.MCQ, "[\"try\", \"catch\", \"finally\", \"throw\"]", "finally", "finally ينفذ في كل الحالات.", 1);
        createQuiz(9L, "catch (Exception e) يمسك أي استثناء", QuizType.TRUE_FALSE, null, "true", "Exception هي الفئة الأب.", 2);
        createQuiz(9L, "ماذا يحدث لو حدث استثناء بدون catch؟", QuizType.MCQ, "[\"يتجاهله\", \"ينهار البرنامج\", \"يعيد المحاولة\", \"لا شيء\"]", "ينهار البرنامج", "الاستثناء غير المعالج يوقف البرنامج.", 3);

        createQuiz(10L, "ما الدالة لإضافة عنصر لـ ArrayList؟", QuizType.MCQ, "[\"add()\", \"put()\", \"insert()\", \"append()\"]", "add()", "لإضافة عنصر: list.add(element);", 1);
        createQuiz(10L, "ArrayList يمكن أن يحتوي على أنواع مختلفة", QuizType.TRUE_FALSE, null, "false", "محدد النوع باستخدام Generics.", 2);
        createQuiz(10L, "ماذا ترجع: list.size() عندما تكون فارغة؟", QuizType.CODE_OUTPUT, null, "0", "size() = 0 للقائمة الفارغة.", 3);
    }

    private void createQuiz(Long lessonId, String question, QuizType type, String options, String correctAnswer, String explanation, int order) {
        QuizQuestion q = QuizQuestion.builder()
                .lesson(Lesson.builder().id(lessonId).build())
                .question(question).type(type).options(options)
                .correctAnswer(correctAnswer).explanation(explanation).orderIndex(order).build();
        quizQuestionRepository.save(q);
    }

    private static final String javaIntroContent = "## شرح\nJava لغة برمجة كائنية التوجه. JVM تشغل برامج Java على أي نظام.\n\n## مفهوم أساسي\nJava = اكتب مرة، شغّل في أي مكان (WORA).\n\n## مثال\n```java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello Java!\");\n    }\n}\n```";

    private static final String variablesContent = "## شرح\nالمتغيرات هي صناديق تخزين. كل متغير له اسم ونوع وقيمة.\n\n## أنواع البيانات\n- int: أعداد صحيحة\n- double: أعداد عشرية\n- boolean: true/false\n- String: نصوص\n\n## مثال\n```java\nint age = 25;\nString name = \"أحمد\";\ndouble price = 99.99;\nboolean isStudent = true;\n```";

    private static final String operatorsContent = "## شرح\nالمعاملات: + - * / % للرياضيات. == != > < للمقارنة. && || ! للمنطق.\n\n## مثال\n```java\nint sum = 10 + 5;  // 15\nboolean check = (10 > 5) && (3 < 7); // true\n```";

    private static final String conditionalsContent = "## شرح\nif تختبر شرطاً. إذا تحقق ينفذ الكود، وإلا ينفذ else.\n\n## مثال\n```java\nif (score >= 60) {\n    System.out.println(\"ناجح\");\n} else {\n    System.out.println(\"راسب\");\n}\n```";

    private static final String loopsContent = "## شرح\nالحلقات تكرر الكود. for عندما تعرف العدد. while عندما تعرف الشرط.\n\n## مثال\n```java\nfor (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}\n```";

    private static final String arraysContent = "## شرح\nالمصفوفة = مجموعة قيم من نفس النوع. تبدأ من index 0.\n\n## مثال\n```java\nint[] numbers = {1, 2, 3, 4, 5};\nSystem.out.println(numbers[0]); // 1\n```";

    private static final String methodsContent = "## شرح\nالدوال تقسم الكود إلى قطع قابلة لإعادة الاستخدام. Parameters مدخلات، return مخرجات.\n\n## مثال\n```java\npublic static int add(int a, int b) {\n    return a + b;\n}\n```";

    private static final String oopContent = "## شرح\nOOP = تنظيم الكود حول كائنات. Class = مخطط. Object = شيء حقيقي.\n\n## مثال\n```java\nclass Car {\n    String brand;\n    void drive() { System.out.println(\"Driving...\"); }\n}\nCar myCar = new Car();\n```";

    private static final String exceptionsContent = "## شرح\ntry = جرب الكود. catch = تعامل مع الخطأ. finally = نفذ دائماً.\n\n## مثال\n```java\ntry {\n    int result = 10 / 0;\n} catch (ArithmeticException e) {\n    System.out.println(\"خطأ!\");\n}\n```";

    private static final String arraylistContent = "## شرح\nArrayList = مصفوفة ديناميكية الحجم. add(), remove(), get(), size().\n\n## مثال\n```java\nArrayList<String> list = new ArrayList<>();\nlist.add(\"عنصر\");\nSystem.out.println(list.size());\n```";

    private static final String buildToolsContent = "## شرح\nأدوات البناء مثل Maven تدير التبعيات وتجمع الكود وتشغل الاختبارات.\n\n## Maven\n- pom.xml: قلب المشروع\n- mvn compile: يجمع الكود\n- mvn test: يشغل الاختبارات\n- mvn package: ينتج JAR";
    private static final String mavenContent = "## شرح\npom.xml يحتوي على GAV (groupId, artifactId, version) والتبعيات.\n\n## مثال\n```xml\n<dependency>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>spring-boot-starter-web</artifactId>\n</dependency>\n```";
    private static final String lifecycleContent = "## شرح\nمراحل Maven: clean → compile → test → package → install\nكل مرحلة تشمل التي قبلها.";
    private static final String startersContent = "## شرح\nSpring Boot Starters هي حزم تبعيات جاهزة. starter-web يضيف Tomcat + Spring MVC تلقائياً.";
    private static final String structureContent = "## شرح\nsrc/main/java = الكود. src/main/resources = الإعدادات. src/test = الاختبارات.";
    private static final String configContent = "## شرح\napplication.yml يدير إعدادات التطبيق. Spring Profiles تسمح بإعدادات مختلفة لكل بيئة.";
    private static final String springIntroContent = "## شرح\nSpring Framework يبسط تطوير Java. Spring Boot يسهل إعداد Spring.";
    private static final String iocContent = "## شرح\nIoC = الحاوية تتحكم في الكائنات. ApplicationContext = حاوية Spring.";
    private static final String diContent = "## شرح\nDI = حقن التبعيات. @Autowired يحقن الكائنات تلقائياً. Constructor Injection هو الأفضل.";
    private static final String beansContent = "## شرح\nBean = كائن تديره Spring. @Component, @Service, @Repository, @Controller.";
    private static final String annotationsContent = "## شرح\n@RestController, @GetMapping, @PostMapping, @RequestBody, @PathVariable.";
    private static final String httpContent = "## شرح\nRestTemplate و WebClient للتواصل HTTP في Spring.";
    private static final String configPropsContent = "## شرح\n@ConfigurationProperties تربط application.yml بكائن Java بشكل type-safe.";
}
// ✅ DataInitializer.java — complete
