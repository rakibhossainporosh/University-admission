-- Sample data for testing the university admission system

-- Insert sample users (students and admins)
INSERT INTO users (email, password_hash, first_name, last_name, role, phone, date_of_birth, address, city, state, zip_code, country) VALUES
-- Students
('sarah.johnson@email.com', '$2b$10$example_hash_1', 'Sarah', 'Johnson', 'student', '+1-555-123-4567', '2006-03-15', '123 Main St', 'Anytown', 'CA', '12345', 'United States'),
('michael.chen@email.com', '$2b$10$example_hash_2', 'Michael', 'Chen', 'student', '+1-555-234-5678', '2006-07-22', '456 Oak Ave', 'Springfield', 'NY', '67890', 'United States'),
('emily.rodriguez@email.com', '$2b$10$example_hash_3', 'Emily', 'Rodriguez', 'student', '+1-555-345-6789', '2006-01-10', '789 Pine St', 'Riverside', 'TX', '54321', 'United States'),
('david.wilson@email.com', '$2b$10$example_hash_4', 'David', 'Wilson', 'student', '+1-555-456-7890', '2005-11-30', '321 Elm Dr', 'Lakewood', 'FL', '98765', 'United States'),
('lisa.thompson@email.com', '$2b$10$example_hash_5', 'Lisa', 'Thompson', 'student', '+1-555-567-8901', '2006-05-18', '654 Maple Ln', 'Hillside', 'WA', '13579', 'United States'),

-- Admins
('admin@university.edu', '$2b$10$example_hash_admin1', 'Dr. Jane', 'Smith', 'admin', '+1-555-111-2222', '1975-08-12', '100 University Blvd', 'College Town', 'CA', '90210', 'United States'),
('reviewer@university.edu', '$2b$10$example_hash_admin2', 'Dr. Robert', 'Johnson', 'admin', '+1-555-333-4444', '1980-04-25', '200 Campus Dr', 'College Town', 'CA', '90210', 'United States'),
('admissions@university.edu', '$2b$10$example_hash_admin3', 'Prof. Maria', 'Brown', 'admin', '+1-555-555-6666', '1978-12-03', '300 Academic Way', 'College Town', 'CA', '90210', 'United States');

-- Insert sample applications
INSERT INTO applications (user_id, application_id, status, program, high_school, graduation_year, gpa, sat_score, act_score, personal_statement, why_university, submitted_at) VALUES
(1, 'APP-2024-001', 'under-review', 'Computer Science', 'Anytown High School', 2024, 3.85, 1420, 32, 
 'From a young age, I have been fascinated by the intersection of technology and human creativity. My passion for computer science began when I built my first website at age 12, and has only grown stronger through my high school years. I have participated in multiple coding competitions, led my school''s robotics team to state championships, and developed mobile apps that have been downloaded by thousands of users.',
 'Your university''s computer science program stands out for its emphasis on both theoretical foundations and practical applications. The opportunity to work with renowned faculty like Dr. Smith on AI research, combined with the strong industry partnerships that provide internship opportunities, makes this the ideal place for me to pursue my academic and career goals.',
 '2024-01-15 10:30:00'),

(2, 'APP-2024-002', 'pending', 'Engineering', 'Springfield Technical High', 2024, 3.92, 1480, 34,
 'Engineering has always been about solving problems that matter to me. Whether it was designing a more efficient water filtration system for our local community center or creating assistive technology for students with disabilities, I have consistently sought ways to apply engineering principles to make a positive impact.',
 'The collaborative research environment at your university, particularly in sustainable engineering, aligns perfectly with my goals of developing environmentally conscious solutions. The interdisciplinary approach and state-of-the-art facilities make this the ideal place to pursue my engineering career.',
 '2024-01-14 14:20:00'),

(3, 'APP-2024-003', 'accepted', 'Biology', 'Riverside Academy', 2024, 4.00, 1520, 35,
 'My fascination with biology began during a summer internship at a local research hospital, where I witnessed firsthand how biological research translates into life-saving treatments. This experience ignited my passion for understanding the intricate mechanisms of life and my desire to contribute to medical breakthroughs.',
 'Your university''s renowned biology department, with its cutting-edge research facilities and emphasis on undergraduate research opportunities, provides the perfect environment for me to explore my interests in molecular biology and genetics while preparing for a career in medical research.',
 '2024-01-13 09:15:00'),

(4, 'APP-2024-004', 'incomplete', 'Business Administration', 'Lakewood Prep', 2024, 3.65, 1350, 29,
 'My entrepreneurial spirit was sparked when I started a small tutoring business in high school, which grew to serve over 50 students. This experience taught me valuable lessons about leadership, customer service, and financial management that I want to build upon through formal business education.',
 'The innovative business program at your university, with its focus on entrepreneurship and real-world application, perfectly aligns with my goal of starting my own company. The strong alumni network and internship opportunities in the business community make this an ideal choice for my future.',
 NULL),

(5, 'APP-2024-005', 'rejected', 'Psychology', 'Hillside High School', 2024, 3.25, 1200, 26,
 'Psychology has always intrigued me because of its potential to help people overcome challenges and improve their lives. Through volunteer work at a local mental health clinic, I have seen how psychological interventions can transform lives and communities.',
 'Your psychology program''s emphasis on both clinical and research applications, combined with opportunities for hands-on experience through internships and community partnerships, makes it the perfect place for me to develop the skills needed to make a meaningful impact in the field of mental health.',
 '2024-01-11 16:45:00');

-- Insert application sections completion status
INSERT INTO application_sections (application_id, section_name, completed, completed_at) VALUES
-- Sarah Johnson (APP-2024-001) - mostly complete
(1, 'personal', TRUE, '2024-01-10 12:00:00'),
(1, 'academic', TRUE, '2024-01-11 14:30:00'),
(1, 'essays', TRUE, '2024-01-12 16:20:00'),
(1, 'recommendations', TRUE, '2024-01-13 10:15:00'),
(1, 'documents', TRUE, '2024-01-14 11:45:00'),
(1, 'additional', FALSE, NULL),

-- Michael Chen (APP-2024-002) - in progress
(2, 'personal', TRUE, '2024-01-09 15:30:00'),
(2, 'academic', TRUE, '2024-01-10 13:20:00'),
(2, 'essays', TRUE, '2024-01-11 17:10:00'),
(2, 'recommendations', FALSE, NULL),
(2, 'documents', TRUE, '2024-01-12 09:30:00'),
(2, 'additional', FALSE, NULL),

-- Emily Rodriguez (APP-2024-003) - complete
(3, 'personal', TRUE, '2024-01-08 11:00:00'),
(3, 'academic', TRUE, '2024-01-09 14:15:00'),
(3, 'essays', TRUE, '2024-01-10 16:30:00'),
(3, 'recommendations', TRUE, '2024-01-11 12:45:00'),
(3, 'documents', TRUE, '2024-01-12 10:20:00'),
(3, 'additional', TRUE, '2024-01-13 08:30:00');

-- Insert sample documents
INSERT INTO documents (application_id, document_name, document_type, file_name, file_size, file_type, file_url, upload_status, uploaded_at) VALUES
-- Sarah Johnson's documents
(1, 'Official High School Transcript', 'transcript', 'transcript_sarah_johnson.pdf', 2048000, 'pdf', '/uploads/transcripts/transcript_sarah_johnson.pdf', 'completed', '2024-01-10 14:20:00'),
(1, 'SAT Score Report', 'test-scores', 'sat_scores_sarah.pdf', 1024000, 'pdf', '/uploads/test-scores/sat_scores_sarah.pdf', 'completed', '2024-01-10 14:25:00'),
(1, 'Teacher Recommendation - Math', 'recommendation', 'rec_letter_math_teacher.pdf', 512000, 'pdf', '/uploads/recommendations/rec_letter_math_teacher.pdf', 'completed', '2024-01-12 09:30:00'),
(1, 'Counselor Recommendation', 'recommendation', 'rec_letter_counselor.pdf', 768000, 'pdf', '/uploads/recommendations/rec_letter_counselor.pdf', 'completed', '2024-01-12 09:35:00'),

-- Michael Chen's documents
(2, 'Official Transcript', 'transcript', 'transcript_michael_chen.pdf', 1856000, 'pdf', '/uploads/transcripts/transcript_michael_chen.pdf', 'completed', '2024-01-09 16:10:00'),
(2, 'SAT Score Report', 'test-scores', 'sat_scores_michael.pdf', 1024000, 'pdf', '/uploads/test-scores/sat_scores_michael.pdf', 'completed', '2024-01-09 16:15:00'),

-- Emily Rodriguez's documents
(3, 'Official Transcript', 'transcript', 'transcript_emily_rodriguez.pdf', 2200000, 'pdf', '/uploads/transcripts/transcript_emily_rodriguez.pdf', 'completed', '2024-01-08 13:45:00'),
(3, 'SAT Score Report', 'test-scores', 'sat_scores_emily.pdf', 1024000, 'pdf', '/uploads/test-scores/sat_scores_emily.pdf', 'completed', '2024-01-08 13:50:00'),
(3, 'Research Portfolio', 'portfolio', 'research_portfolio_emily.pdf', 5120000, 'pdf', '/uploads/portfolio/research_portfolio_emily.pdf', 'completed', '2024-01-10 11:20:00');

-- Insert status history for applications
INSERT INTO status_history (application_id, status, stage_name, stage_description, completed, completed_at, estimated_completion) VALUES
-- Sarah Johnson's status history
(1, 'submitted', 'Application Submitted', 'Application has been successfully submitted and confirmed', TRUE, '2024-01-15 10:30:00', NULL),
(1, 'under-review', 'Document Review', 'Reviewing submitted documents and transcripts for completeness', TRUE, '2024-01-16 09:15:00', NULL),
(1, 'under-review', 'Initial Review', 'Academic credentials and eligibility assessment in progress', FALSE, NULL, '2024-02-15 17:00:00'),
(1, 'pending', 'Committee Review', 'Comprehensive review by admissions committee', FALSE, NULL, '2024-02-28 17:00:00'),
(1, 'pending', 'Final Decision', 'Admission decision finalized and communicated', FALSE, NULL, '2024-03-15 17:00:00'),

-- Michael Chen's status history
(2, 'submitted', 'Application Submitted', 'Application has been successfully submitted and confirmed', TRUE, '2024-01-14 14:20:00', NULL),
(2, 'pending', 'Document Review', 'Waiting for all required documents to be submitted', FALSE, NULL, '2024-02-01 17:00:00'),

-- Emily Rodriguez's status history
(3, 'submitted', 'Application Submitted', 'Application has been successfully submitted and confirmed', TRUE, '2024-01-13 09:15:00', NULL),
(3, 'under-review', 'Document Review', 'All documents verified and complete', TRUE, '2024-01-14 10:30:00', NULL),
(3, 'under-review', 'Initial Review', 'Academic credentials reviewed - excellent performance', TRUE, '2024-01-18 14:20:00', NULL),
(3, 'under-review', 'Committee Review', 'Comprehensive review completed with positive recommendation', TRUE, '2024-01-25 16:45:00', NULL),
(3, 'accepted', 'Final Decision', 'Congratulations! You have been accepted to our program', TRUE, '2024-01-30 11:00:00', NULL);

-- Insert review notes
INSERT INTO review_notes (application_id, reviewer_id, note, rating) VALUES
(1, 6, 'Strong academic performance with impressive extracurricular activities. The robotics leadership and mobile app development demonstrate practical application of computer science skills. Personal statement shows genuine passion for the field.', 4),
(1, 7, 'Excellent SAT scores and GPA. The "why university" essay shows good research about our program. Recommend moving to committee review stage.', 4),

(3, 6, 'Outstanding academic record with perfect GPA. Research experience is exceptional for a high school student. Strong letters of recommendation from science teachers.', 5),
(3, 8, 'Exceptional candidate with clear research interests. The biology research portfolio demonstrates advanced understanding. Strong fit for our honors program.', 5);

-- Insert notifications
INSERT INTO notifications (user_id, application_id, type, title, message, read) VALUES
-- Sarah Johnson's notifications
(1, 1, 'success', 'Documents Verified', 'All your submitted documents have been verified and are complete.', FALSE),
(1, 1, 'info', 'Application Under Review', 'Your application has moved to the initial review stage.', FALSE),
(1, 1, 'info', 'Application Received', 'We have received your complete application. Thank you for applying!', TRUE),

-- Michael Chen's notifications
(2, 2, 'warning', 'Missing Documents', 'Please submit your letters of recommendation to complete your application.', FALSE),
(2, 2, 'info', 'Application Received', 'We have received your application. Please complete all required sections.', TRUE),

-- Emily Rodriguez's notifications
(3, 3, 'success', 'Congratulations!', 'You have been accepted to our Biology program. Welcome to the university!', FALSE),
(3, 3, 'info', 'Application Complete', 'Your application review has been completed.', TRUE),
(3, 3, 'success', 'Documents Verified', 'All documents have been verified successfully.', TRUE);

-- Insert extracurricular activities
INSERT INTO activities (application_id, activity_name, description, role, start_date, end_date, hours_per_week) VALUES
-- Sarah Johnson's activities
(1, 'Robotics Team', 'Led school robotics team to state championship, designed and programmed autonomous robots', 'Team Captain', '2022-09-01', '2024-05-31', 10),
(1, 'National Honor Society', 'Member of prestigious academic honor society, participated in community service projects', 'Member', '2023-01-01', '2024-05-31', 2),
(1, 'Mobile App Development', 'Developed and published 3 mobile applications with over 10,000 downloads combined', 'Developer', '2021-06-01', '2024-01-01', 8),
(1, 'Volunteer Coding Instructor', 'Taught basic programming concepts to middle school students at local community center', 'Instructor', '2023-06-01', '2023-08-31', 4),

-- Emily Rodriguez's activities
(3, 'Science Olympiad', 'Competed in regional and state science competitions, specialized in biology and chemistry events', 'Team Member', '2022-09-01', '2024-05-31', 6),
(3, 'Hospital Volunteer', 'Volunteered at local hospital, assisted with patient care and administrative tasks', 'Volunteer', '2023-01-01', '2024-01-01', 4),
(3, 'Research Internship', 'Conducted independent research on plant genetics under supervision of university professor', 'Research Assistant', '2023-06-01', '2023-08-31', 20);

-- Insert requirements checklist
INSERT INTO requirements (application_id, requirement_name, requirement_type, status, due_date, completed_at) VALUES
-- Sarah Johnson's requirements
(1, 'Official Transcript', 'transcript', 'completed', '2024-01-31', '2024-01-10 14:20:00'),
(1, 'Standardized Test Scores', 'test-scores', 'completed', '2024-01-31', '2024-01-10 14:25:00'),
(1, 'Letters of Recommendation', 'recommendation', 'completed', '2024-01-31', '2024-01-12 09:35:00'),
(1, 'Personal Statement', 'essay', 'completed', '2024-01-31', '2024-01-12 16:20:00'),
(1, 'Mid-Year Grades', 'transcript', 'pending', '2024-02-15', NULL),

-- Michael Chen's requirements
(2, 'Official Transcript', 'transcript', 'completed', '2024-01-31', '2024-01-09 16:10:00'),
(2, 'Standardized Test Scores', 'test-scores', 'completed', '2024-01-31', '2024-01-09 16:15:00'),
(2, 'Letters of Recommendation', 'recommendation', 'missing', '2024-01-31', NULL),
(2, 'Personal Statement', 'essay', 'completed', '2024-01-31', '2024-01-11 17:10:00'),

-- Emily Rodriguez's requirements
(3, 'Official Transcript', 'transcript', 'completed', '2024-01-31', '2024-01-08 13:45:00'),
(3, 'Standardized Test Scores', 'test-scores', 'completed', '2024-01-31', '2024-01-08 13:50:00'),
(3, 'Letters of Recommendation', 'recommendation', 'completed', '2024-01-31', '2024-01-11 12:45:00'),
(3, 'Personal Statement', 'essay', 'completed', '2024-01-31', '2024-01-10 16:30:00'),
(3, 'Research Portfolio', 'portfolio', 'completed', '2024-01-31', '2024-01-10 11:20:00');
