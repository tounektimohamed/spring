import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';
import { authApi } from '../api/auth';
import { Toast } from '../components/ui/Toast';

export default function Register() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await authApi.register({ email, password, displayName });
      if (data.success) {
        login(data.data);
        setToast('تم إنشاء الحساب بنجاح');
        setTimeout(() => navigate('/dashboard'), 500);
      }
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'فشل التسجيل';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {toast && <Toast message={toast} type="success" onClose={() => setToast('')} />}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface border border-border rounded-card p-8 w-full max-w-md shadow-card"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-display font-bold text-primary">SpringPath</h1>
          <p className="text-textMuted mt-2">أنشئ حسابك وابدأ رحلة التعلم</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="الاسم"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="أحمد محمد"
            required
          />
          <Input
            label="البريد الإلكتروني"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
          />
          <Input
            label="كلمة المرور"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8 أحرف على الأقل"
            required
            minLength={8}
          />
          {error && <p className="text-danger text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
          </Button>
        </form>

        <p className="text-center text-textMuted text-sm mt-6">
          لديك حساب؟{' '}
          <Link to="/login" className="text-primary hover:underline">سجل الدخول</Link>
        </p>
      </motion.div>
    </div>
  );
}
