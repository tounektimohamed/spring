import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const phases = [
  { number: 1, title: 'المرحلة الأولى: الأساس', lessons: 23, color: '#22D3EE' },
  { number: 2, title: 'المرحلة الثانية: Spring Web', lessons: 18, color: '#818CF8' },
  { number: 3, title: 'المرحلة الثالثة: Data & JPA', lessons: 16, color: '#10B981' },
  { number: 4, title: 'المرحلة الرابعة: Security', lessons: 16, color: '#F59E0B' },
  { number: 5, title: 'المرحلة الخامسة: Microservices', lessons: 15, color: '#EF4444' },
  { number: 6, title: 'المرحلة السادسة: Professional', lessons: 15, color: '#6DB33F' },
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative px-6 pt-32 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="relative max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-pill bg-primary/10 text-primary text-sm font-medium mb-6">
            منصة SpringPath التعليمية
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
            أتقن <span className="text-primary">Spring Boot</span>
            <br />
            درساً تلو الآخر
          </h1>
          <p className="text-lg text-textMuted max-w-2xl mx-auto mb-10">
            منصة تفاعلية لتعلم Spring Boot من الصفر إلى الاحتراف. دروس مشروحة، بيئة برمجة مدمجة،
            ومسار تعليمي مقسم إلى مراحل مع شهادات وشارات.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg">ابدأ مجاناً</Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg">لدي حساب بالفعل</Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            { title: 'مسار منظم', desc: '6 مراحل | 22 أسبوعاً | 103 دروساً — تقدم تدريجي بدون ثغرات', emoji: '🛤️' },
            { title: 'محرر أكواد تفاعلي', desc: 'بيئة برمجة مدمجة مع Monaco Editor — اكتب وجرب الأكواد مباشرة', emoji: '💻' },
            { title: 'تقدم بالألعاب', desc: 'شارات، نقاط XP، ومراحل — تعلم ممتع مثل Duolingo', emoji: '🎮' },
          ].map((f, i) => (
            <motion.div key={i} variants={fadeIn} className="bg-surface border border-border rounded-card p-6">
              <span className="text-3xl mb-4 block">{f.emoji}</span>
              <h3 className="text-xl font-display font-semibold mb-2">{f.title}</h3>
              <p className="text-textMuted">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Curriculum Preview */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-display font-bold text-center mb-12">المنهج الدراسي</h2>
        <div className="space-y-3">
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className="bg-surface border border-border rounded-card p-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{ backgroundColor: phase.color + '20', color: phase.color }}>
                  {phase.number}
                </div>
                <div>
                  <h4 className="font-semibold">{phase.title}</h4>
                  <p className="text-sm text-textMuted">{phase.lessons} درساً</p>
                </div>
              </div>
              <span className="text-sm text-textMuted">→</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-16 border-t border-border">
        <div className="max-w-3xl mx-auto flex justify-around text-center">
          {[
            { value: '103', label: 'درساً' },
            { value: '22', label: 'أسبوعاً' },
            { value: '8', label: 'شارات' },
            { value: '1', label: 'شهادة' },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-display font-bold text-primary">{s.value}</div>
              <div className="text-sm text-textMuted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border text-center text-sm text-textMuted">
        SpringPath — منصة تعلم Spring Boot التفاعلية
      </footer>
    </div>
  );
}
