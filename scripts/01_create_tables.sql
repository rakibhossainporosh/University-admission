-- University Admission System Database Schema
-- This script creates all the necessary tables for the admission system

-- Users table (students and admins)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'student', -- 'student' or 'admin'
    phone VARCHAR(20),
    date_of_birth DATE,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(20),
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Applications table (main application data)
CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    application_id VARCHAR(50) UNIQUE NOT NULL, -- e.g., 'APP-2024-001'
    status VARCHAR(50) NOT NULL DEFAULT 'draft', -- 'draft', 'submitted', 'under-review', 'accepted', 'rejected', 'incomplete'
    program VARCHAR(100) NOT NULL,
    high_school VARCHAR(200),
    graduation_year INTEGER,
    gpa DECIMAL(3,2),
    sat_score INTEGER,
    act_score INTEGER,
    personal_statement TEXT,
    why_university TEXT,
    submitted_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Application sections completion tracking
CREATE TABLE IF NOT EXISTS application_sections (
    id SERIAL PRIMARY KEY,
    application_id INTEGER REFERENCES applications(id) ON DELETE CASCADE,
    section_name VARCHAR(50) NOT NULL, -- 'personal', 'academic', 'essays', 'recommendations', 'documents', 'additional'
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(application_id, section_name)
);

-- Documents table (uploaded files)
CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    application_id INTEGER REFERENCES applications(id) ON DELETE CASCADE,
    document_name VARCHAR(255) NOT NULL,
    document_type VARCHAR(100) NOT NULL, -- 'transcript', 'test-scores', 'essay', 'recommendation', 'certificate', 'portfolio'
    file_name VARCHAR(255) NOT NULL,
    file_size INTEGER NOT NULL,
    file_type VARCHAR(50) NOT NULL, -- 'pdf', 'doc', 'jpg', etc.
    file_url TEXT, -- URL to the uploaded file
    upload_status VARCHAR(20) DEFAULT 'uploading', -- 'uploading', 'completed', 'error'
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Application status history (timeline tracking)
CREATE TABLE IF NOT EXISTS status_history (
    id SERIAL PRIMARY KEY,
    application_id INTEGER REFERENCES applications(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    stage_name VARCHAR(100) NOT NULL, -- 'Application Submitted', 'Document Review', etc.
    stage_description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    estimated_completion TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Review notes from admissions staff
CREATE TABLE IF NOT EXISTS review_notes (
    id SERIAL PRIMARY KEY,
    application_id INTEGER REFERENCES applications(id) ON DELETE CASCADE,
    reviewer_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    note TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5), -- 1-5 star rating
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications for students
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    application_id INTEGER REFERENCES applications(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL DEFAULT 'info', -- 'info', 'success', 'warning', 'error'
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Extracurricular activities
CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    application_id INTEGER REFERENCES applications(id) ON DELETE CASCADE,
    activity_name VARCHAR(200) NOT NULL,
    description TEXT,
    role VARCHAR(100),
    start_date DATE,
    end_date DATE,
    hours_per_week INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Requirements checklist
CREATE TABLE IF NOT EXISTS requirements (
    id SERIAL PRIMARY KEY,
    application_id INTEGER REFERENCES applications(id) ON DELETE CASCADE,
    requirement_name VARCHAR(100) NOT NULL,
    requirement_type VARCHAR(50) NOT NULL, -- 'transcript', 'test-scores', 'essay', etc.
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'completed', 'missing'
    due_date DATE,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_application_id ON applications(application_id);
CREATE INDEX IF NOT EXISTS idx_documents_application_id ON documents(application_id);
CREATE INDEX IF NOT EXISTS idx_status_history_application_id ON status_history(application_id);
CREATE INDEX IF NOT EXISTS idx_review_notes_application_id ON review_notes(application_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_application_id ON activities(application_id);
CREATE INDEX IF NOT EXISTS idx_requirements_application_id ON requirements(application_id);
