-- Utility functions for the university admission system

-- Function to generate unique application ID
CREATE OR REPLACE FUNCTION generate_application_id()
RETURNS TEXT AS $$
DECLARE
    year_part TEXT;
    sequence_part TEXT;
    new_id TEXT;
BEGIN
    -- Get current year
    year_part := EXTRACT(YEAR FROM CURRENT_DATE)::TEXT;
    
    -- Get next sequence number for this year
    SELECT LPAD((COUNT(*) + 1)::TEXT, 3, '0') INTO sequence_part
    FROM applications 
    WHERE application_id LIKE 'APP-' || year_part || '-%';
    
    -- Construct the ID
    new_id := 'APP-' || year_part || '-' || sequence_part;
    
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update application status and create history entry
CREATE OR REPLACE FUNCTION update_application_status(
    app_id INTEGER,
    new_status VARCHAR(50),
    stage_name VARCHAR(100),
    stage_description TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    -- Update the application status
    UPDATE applications 
    SET status = new_status, updated_at = CURRENT_TIMESTAMP
    WHERE id = app_id;
    
    -- Insert status history entry
    INSERT INTO status_history (application_id, status, stage_name, stage_description, completed, completed_at)
    VALUES (app_id, new_status, stage_name, stage_description, TRUE, CURRENT_TIMESTAMP);
    
    -- Create notification for the student
    INSERT INTO notifications (user_id, application_id, type, title, message, read)
    SELECT 
        a.user_id,
        app_id,
        CASE 
            WHEN new_status = 'accepted' THEN 'success'
            WHEN new_status = 'rejected' THEN 'error'
            WHEN new_status = 'incomplete' THEN 'warning'
            ELSE 'info'
        END,
        'Application Status Updated',
        'Your application status has been updated to: ' || new_status,
        FALSE
    FROM applications a
    WHERE a.id = app_id;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate application completion percentage
CREATE OR REPLACE FUNCTION calculate_completion_percentage(app_id INTEGER)
RETURNS INTEGER AS $$
DECLARE
    total_sections INTEGER := 6; -- personal, academic, essays, recommendations, documents, additional
    completed_sections INTEGER;
    completion_percentage INTEGER;
BEGIN
    -- Count completed sections
    SELECT COUNT(*) INTO completed_sections
    FROM application_sections
    WHERE application_id = app_id AND completed = TRUE;
    
    -- Calculate percentage
    completion_percentage := ROUND((completed_sections::DECIMAL / total_sections) * 100);
    
    RETURN completion_percentage;
END;
$$ LANGUAGE plpgsql;

-- Function to check if application is ready for submission
CREATE OR REPLACE FUNCTION is_application_ready_for_submission(app_id INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
    required_sections TEXT[] := ARRAY['personal', 'academic', 'essays', 'recommendations', 'documents'];
    missing_sections INTEGER;
BEGIN
    -- Check if all required sections are completed
    SELECT COUNT(*) INTO missing_sections
    FROM unnest(required_sections) AS section_name
    WHERE NOT EXISTS (
        SELECT 1 FROM application_sections 
        WHERE application_id = app_id 
        AND section_name = application_sections.section_name 
        AND completed = TRUE
    );
    
    RETURN missing_sections = 0;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_application_sections_updated_at BEFORE UPDATE ON application_sections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
