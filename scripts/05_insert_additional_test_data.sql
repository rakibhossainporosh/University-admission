-- Additional test data for comprehensive testing

-- Insert more test students
INSERT INTO users (email, password_hash, first_name, last_name, role, phone, date_of_birth, address, city, state, zip_code, country) VALUES
('alex.kim@email.com', '$2b$10$example_hash_6', 'Alex', 'Kim', 'student', '+1-555-678-9012', '2006-09-14', '987 Cedar St', 'Westfield', 'IL', '24680', 'United States'),
('sophia.garcia@email.com', '$2b$10$example_hash_7', 'Sophia', 'Garcia', 'student', '+1-555-789-0123', '2006-02-28', '147 Birch Ave', 'Eastside', 'OR', '97531', 'United States'),
('james.taylor@email.com', '$2b$10$example_hash_8', 'James', 'Taylor', 'student', '+1-555-890-1234', '2005-12-05', '258 Willow Dr', 'Northbrook', 'MI', '86420', 'United States');

-- Insert applications for new students
INSERT INTO applications (user_id, application_id, status, program, high_school, graduation_year, gpa, sat_score, act_score, personal_statement, why_university, submitted_at) VALUES
(6, 'APP-2024-006', 'draft', 'Mathematics', 'Westfield Academy', 2024, 3.75, 1380, 31, 
 'Mathematics has always been the language through which I understand the world. From solving complex calculus problems to applying statistical analysis to real-world data, I find joy in the logical beauty and practical applications of mathematical concepts.',
 'Your mathematics department''s reputation for excellence in both pure and applied mathematics, combined with opportunities for undergraduate research, makes it the perfect place to deepen my understanding and contribute to mathematical knowledge.',
 NULL),

(7, 'APP-2024-007', 'submitted', 'Art History', 'Eastside Creative Arts High', 2024, 3.68, 1290, 28,
 'Art has the power to transcend cultural boundaries and speak to the human experience across time and space. My passion for art history stems from my desire to understand how artistic expression reflects and shapes society throughout different periods.',
 'The comprehensive art history program at your university, with its extensive museum partnerships and study abroad opportunities, offers the ideal environment to explore my interests in Renaissance and contemporary art while developing critical analysis skills.',
 '2024-01-16 11:20:00'),

(8, 'APP-2024-008', 'under-review', 'Physics', 'Northbrook STEM Academy', 2024, 3.95, 1510, 34,
 'Physics represents humanity''s quest to understand the fundamental laws governing our universe. From quantum mechanics to astrophysics, I am driven by curiosity about how the cosmos works at every scale, from subatomic particles to galaxies.',
 'Your physics department''s world-class research facilities and faculty expertise in theoretical physics align perfectly with my academic interests. The opportunity to participate in cutting-edge research as an undergraduate makes this program uniquely appealing.',
 '2024-01-17 13:45:00');

-- Insert application sections for new students
INSERT INTO application_sections (application_id, section_name, completed, completed_at) VALUES
-- Alex Kim (draft application)
(6, 'personal', TRUE, '2024-01-15 10:30:00'),
(6, 'academic', TRUE, '2024-01-15 14:20:00'),
(6, 'essays', FALSE, NULL),
(6, 'recommendations', FALSE, NULL),
(6, 'documents', FALSE, NULL),
(6, 'additional', FALSE, NULL),

-- Sophia Garcia (submitted)
(7, 'personal', TRUE, '2024-01-12 09:15:00'),
(7, 'academic', TRUE, '2024-01-13 11:30:00'),
(7, 'essays', TRUE, '2024-01-14 15:45:00'),
(7, 'recommendations', TRUE, '2024-01-15 12:20:00'),
(7, 'documents', TRUE, '2024-01-16 08:30:00'),
(7, 'additional', TRUE, '2024-01-16 10:15:00'),

-- James Taylor (under review)
(8, 'personal', TRUE, '2024-01-14 13:00:00'),
(8, 'academic', TRUE, '2024-01-15 16:30:00'),
(8, 'essays', TRUE, '2024-01-16 14:20:00'),
(8, 'recommendations', TRUE, '2024-01-17 09:45:00'),
(8, 'documents', TRUE, '2024-01-17 11:30:00'),
(8, 'additional', FALSE, NULL);

-- Insert more documents
INSERT INTO documents (application_id, document_name, document_type, file_name, file_size, file_type, file_url, upload_status, uploaded_at) VALUES
-- Sophia Garcia's documents
(7, 'Official Transcript', 'transcript', 'transcript_sophia_garcia.pdf', 1920000, 'pdf', '/uploads/transcripts/transcript_sophia_garcia.pdf', 'completed', '2024-01-16 08:30:00'),
(7, 'SAT Score Report', 'test-scores', 'sat_scores_sophia.pdf', 1024000, 'pdf', '/uploads/test-scores/sat_scores_sophia.pdf', 'completed', '2024-01-16 08:35:00'),
(7, 'Art Portfolio', 'portfolio', 'art_portfolio_sophia.pdf', 8192000, 'pdf', '/uploads/portfolio/art_portfolio_sophia.pdf', 'completed', '2024-01-16 09:15:00'),

-- James Taylor's documents
(8, 'Official Transcript', 'transcript', 'transcript_james_taylor.pdf', 2100000, 'pdf', '/uploads/transcripts/transcript_james_taylor.pdf', 'completed', '2024-01-17 11:30:00'),
(8, 'SAT Score Report', 'test-scores', 'sat_scores_james.pdf', 1024000, 'pdf', '/uploads/test-scores/sat_scores_james.pdf', 'completed', '2024-01-17 11:35:00'),
(8, 'Physics Research Paper', 'portfolio', 'physics_research_james.pdf', 3072000, 'pdf', '/uploads/portfolio/physics_research_james.pdf', 'completed', '2024-01-17 12:00:00');

-- Insert more status history
INSERT INTO status_history (application_id, status, stage_name, stage_description, completed, completed_at, estimated_completion) VALUES
-- Sophia Garcia's status
(7, 'submitted', 'Application Submitted', 'Application successfully submitted with all required materials', TRUE, '2024-01-16 11:20:00', NULL),
(7, 'pending', 'Document Review', 'Initial document verification in progress', FALSE, NULL, '2024-02-01 17:00:00'),

-- James Taylor's status
(8, 'submitted', 'Application Submitted', 'Application successfully submitted', TRUE, '2024-01-17 13:45:00', NULL),
(8, 'under-review', 'Document Review', 'All documents verified and complete', TRUE, '2024-01-18 10:20:00', NULL),
(8, 'under-review', 'Initial Review', 'Academic review in progress - strong physics background noted', FALSE, NULL, '2024-02-10 17:00:00');

-- Insert more notifications
INSERT INTO notifications (user_id, application_id, type, title, message, read) VALUES
-- Alex Kim's notifications
(6, 6, 'info', 'Application Started', 'Welcome! You have started your university application. Please complete all sections.', TRUE),

-- Sophia Garcia's notifications
(7, 7, 'success', 'Application Submitted', 'Your application has been successfully submitted. We will review it shortly.', FALSE),
(7, 7, 'info', 'Portfolio Received', 'Your art portfolio has been received and will be reviewed by our faculty.', FALSE),

-- James Taylor's notifications
(8, 8, 'success', 'Documents Verified', 'All your documents have been verified successfully.', FALSE),
(8, 8, 'info', 'Under Review', 'Your application is now under review by our admissions committee.', FALSE);

-- Insert more activities
INSERT INTO activities (application_id, activity_name, description, role, start_date, end_date, hours_per_week) VALUES
-- Sophia Garcia's activities
(7, 'Art Club President', 'Led school art club, organized exhibitions and community art projects', 'President', '2023-09-01', '2024-05-31', 5),
(7, 'Museum Volunteer', 'Volunteer docent at local art museum, conducted tours for school groups', 'Volunteer', '2022-06-01', '2024-01-01', 3),
(7, 'Community Mural Project', 'Collaborated with local artists to create public murals celebrating community diversity', 'Artist', '2023-06-01', '2023-08-31', 15),

-- James Taylor's activities
(8, 'Physics Olympiad', 'Competed in national physics competitions, placed in top 10 regionally', 'Competitor', '2022-09-01', '2024-05-31', 8),
(8, 'Astronomy Club', 'Founded and led school astronomy club, organized stargazing events', 'Founder/President', '2022-01-01', '2024-05-31', 4),
(8, 'Research Assistant', 'Assisted physics professor with research on quantum computing applications', 'Research Assistant', '2023-06-01', '2023-08-31', 12);

-- Insert more requirements
INSERT INTO requirements (application_id, requirement_name, requirement_type, status, due_date, completed_at) VALUES
-- Sophia Garcia's requirements
(7, 'Official Transcript', 'transcript', 'completed', '2024-01-31', '2024-01-16 08:30:00'),
(7, 'Standardized Test Scores', 'test-scores', 'completed', '2024-01-31', '2024-01-16 08:35:00'),
(7, 'Letters of Recommendation', 'recommendation', 'completed', '2024-01-31', '2024-01-15 12:20:00'),
(7, 'Personal Statement', 'essay', 'completed', '2024-01-31', '2024-01-14 15:45:00'),
(7, 'Art Portfolio', 'portfolio', 'completed', '2024-01-31', '2024-01-16 09:15:00'),

-- James Taylor's requirements
(8, 'Official Transcript', 'transcript', 'completed', '2024-01-31', '2024-01-17 11:30:00'),
(8, 'Standardized Test Scores', 'test-scores', 'completed', '2024-01-31', '2024-01-17 11:35:00'),
(8, 'Letters of Recommendation', 'recommendation', 'completed', '2024-01-31', '2024-01-17 09:45:00'),
(8, 'Personal Statement', 'essay', 'completed', '2024-01-31', '2024-01-16 14:20:00'),
(8, 'Research Portfolio', 'portfolio', 'completed', '2024-01-31', '2024-01-17 12:00:00');

-- Insert some review notes for new applications
INSERT INTO review_notes (application_id, reviewer_id, note, rating) VALUES
(8, 6, 'Exceptional physics background with strong research experience. The quantum computing research shows advanced understanding for a high school student.', 5),
(7, 8, 'Creative portfolio demonstrates strong artistic vision and technical skill. Good fit for our art history program with studio art minor.', 4);
