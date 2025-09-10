-- Useful views for the university admission system

-- View for application overview with user details
CREATE OR REPLACE VIEW application_overview AS
SELECT 
    a.id,
    a.application_id,
    a.status,
    a.program,
    a.gpa,
    a.sat_score,
    a.act_score,
    a.submitted_at,
    a.created_at,
    a.updated_at,
    u.first_name,
    u.last_name,
    u.email,
    u.phone,
    calculate_completion_percentage(a.id) as completion_percentage,
    is_application_ready_for_submission(a.id) as ready_for_submission
FROM applications a
JOIN users u ON a.user_id = u.id;

-- View for application statistics
CREATE OR REPLACE VIEW application_statistics AS
SELECT 
    COUNT(*) as total_applications,
    COUNT(CASE WHEN status = 'submitted' THEN 1 END) as submitted,
    COUNT(CASE WHEN status = 'under-review' THEN 1 END) as under_review,
    COUNT(CASE WHEN status = 'accepted' THEN 1 END) as accepted,
    COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected,
    COUNT(CASE WHEN status = 'incomplete' THEN 1 END) as incomplete,
    COUNT(CASE WHEN status = 'draft' THEN 1 END) as draft,
    ROUND(AVG(gpa), 2) as average_gpa,
    ROUND(AVG(sat_score)) as average_sat,
    ROUND(AVG(act_score)) as average_act
FROM applications
WHERE submitted_at IS NOT NULL;

-- View for document completion status
CREATE OR REPLACE VIEW document_completion_status AS
SELECT 
    a.id as application_id,
    a.application_id as app_number,
    u.first_name,
    u.last_name,
    COUNT(d.id) as total_documents,
    COUNT(CASE WHEN d.upload_status = 'completed' THEN 1 END) as completed_documents,
    COUNT(CASE WHEN d.upload_status = 'uploading' THEN 1 END) as uploading_documents,
    COUNT(CASE WHEN d.upload_status = 'error' THEN 1 END) as error_documents
FROM applications a
JOIN users u ON a.user_id = u.id
LEFT JOIN documents d ON a.id = d.application_id
GROUP BY a.id, a.application_id, u.first_name, u.last_name;

-- View for recent activity
CREATE OR REPLACE VIEW recent_activity AS
SELECT 
    'application' as activity_type,
    a.application_id as reference_id,
    u.first_name || ' ' || u.last_name as student_name,
    'Application ' || a.status as activity_description,
    a.updated_at as activity_date
FROM applications a
JOIN users u ON a.user_id = u.id
WHERE a.updated_at >= CURRENT_DATE - INTERVAL '7 days'

UNION ALL

SELECT 
    'document' as activity_type,
    a.application_id as reference_id,
    u.first_name || ' ' || u.last_name as student_name,
    'Document uploaded: ' || d.document_name as activity_description,
    d.uploaded_at as activity_date
FROM documents d
JOIN applications a ON d.application_id = a.id
JOIN users u ON a.user_id = u.id
WHERE d.uploaded_at >= CURRENT_DATE - INTERVAL '7 days'

UNION ALL

SELECT 
    'review' as activity_type,
    a.application_id as reference_id,
    u.first_name || ' ' || u.last_name as student_name,
    'Review note added by ' || r.first_name || ' ' || r.last_name as activity_description,
    rn.created_at as activity_date
FROM review_notes rn
JOIN applications a ON rn.application_id = a.id
JOIN users u ON a.user_id = u.id
JOIN users r ON rn.reviewer_id = r.id
WHERE rn.created_at >= CURRENT_DATE - INTERVAL '7 days'

ORDER BY activity_date DESC;

-- View for reviewer workload
CREATE OR REPLACE VIEW reviewer_workload AS
SELECT 
    u.id as reviewer_id,
    u.first_name || ' ' || u.last_name as reviewer_name,
    COUNT(DISTINCT rn.application_id) as applications_reviewed,
    COUNT(rn.id) as total_reviews,
    ROUND(AVG(rn.rating), 2) as average_rating,
    MAX(rn.created_at) as last_review_date
FROM users u
LEFT JOIN review_notes rn ON u.id = rn.reviewer_id
WHERE u.role = 'admin'
GROUP BY u.id, u.first_name, u.last_name;
