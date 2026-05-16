-- V1__init.sql — SpringPath Database Schema
-- ==========================================

-- Users
CREATE TABLE users (
  id           BIGSERIAL PRIMARY KEY,
  email        VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  role         VARCHAR(20) DEFAULT 'USER',
  streak_count INT DEFAULT 0,
  last_activity DATE,
  avatar_url   VARCHAR(500),
  created_at   TIMESTAMP DEFAULT NOW()
);

-- Courses (Phase level)
CREATE TABLE courses (
  id          BIGSERIAL PRIMARY KEY,
  slug        VARCHAR(100) UNIQUE NOT NULL,
  title       VARCHAR(200) NOT NULL,
  description TEXT,
  level       VARCHAR(20) NOT NULL,
  color       VARCHAR(7),
  icon        VARCHAR(50),
  order_index INT NOT NULL,
  is_published BOOLEAN DEFAULT false
);

-- Modules (inside each course)
CREATE TABLE modules (
  id          BIGSERIAL PRIMARY KEY,
  course_id   BIGINT REFERENCES courses(id) ON DELETE CASCADE,
  title       VARCHAR(200) NOT NULL,
  description TEXT,
  order_index INT NOT NULL,
  duration_minutes INT
);

-- Lessons (inside each module)
CREATE TABLE lessons (
  id              BIGSERIAL PRIMARY KEY,
  module_id       BIGINT REFERENCES modules(id) ON DELETE CASCADE,
  title           VARCHAR(200) NOT NULL,
  type            VARCHAR(20) NOT NULL,
  content_markdown TEXT NOT NULL,
  code_example    TEXT,
  code_solution   TEXT,
  expected_output TEXT,
  duration_minutes INT,
  order_index     INT NOT NULL,
  xp_reward       INT DEFAULT 10
);

-- Quizzes (one quiz per lesson, multiple questions)
CREATE TABLE quiz_questions (
  id             BIGSERIAL PRIMARY KEY,
  lesson_id      BIGINT REFERENCES lessons(id) ON DELETE CASCADE,
  question       TEXT NOT NULL,
  type           VARCHAR(20) NOT NULL,
  options        JSONB,
  correct_answer VARCHAR(500) NOT NULL,
  explanation    TEXT,
  order_index    INT NOT NULL
);

-- User Progress
CREATE TABLE user_progress (
  id           BIGSERIAL PRIMARY KEY,
  user_id      BIGINT REFERENCES users(id) ON DELETE CASCADE,
  lesson_id    BIGINT REFERENCES lessons(id) ON DELETE CASCADE,
  completed_at TIMESTAMP DEFAULT NOW(),
  quiz_score   INT,
  attempts     INT DEFAULT 1,
  time_spent_seconds INT,
  UNIQUE(user_id, lesson_id)
);

-- Badges
CREATE TABLE badges (
  id          BIGSERIAL PRIMARY KEY,
  user_id     BIGINT REFERENCES users(id) ON DELETE CASCADE,
  badge_type  VARCHAR(50) NOT NULL,
  earned_at   TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, badge_type)
);

-- Refresh Tokens
CREATE TABLE refresh_tokens (
  id          BIGSERIAL PRIMARY KEY,
  user_id     BIGINT REFERENCES users(id) ON DELETE CASCADE,
  token       VARCHAR(500) UNIQUE NOT NULL,
  expires_at  TIMESTAMP NOT NULL,
  revoked     BOOLEAN DEFAULT false
);

-- Indexes
CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_user_progress_lesson ON user_progress(lesson_id);
CREATE INDEX idx_lessons_module ON lessons(module_id);
CREATE INDEX idx_modules_course ON modules(course_id);
CREATE INDEX idx_badges_user ON badges(user_id);
-- ✅ V1__init.sql — complete
