INSERT INTO forms (id, title, description, is_quiz)
VALUES 
('11111111-1111-1111-1111-111111111111', 'Form Title 1', 'Description of Form 1', false),
('22222222-2222-2222-2222-222222222222', 'Form Title 2', 'Description of Form 2', true);

INSERT INTO sections (id, form_id, title, description)
VALUES 
('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Section 1', 'Description of Section 1'),
('44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'Section 2', 'Description of Section 2');

INSERT INTO questions (id, section_id, question_text, type, metadata, correct_answer_id)
VALUES 
('55555555-5555-5555-5555-555555555555', '33333333-3333-3333-3333-333333333333', 'What is 2+2?', 'text', NULL, NULL),
('66666666-6666-6666-6666-666666666666', '44444444-4444-4444-4444-444444444444', 'Choose the correct option', 'select', NULL, NULL);

INSERT INTO question_choices (id, question_id, choice_text)
VALUES 
('77777777-7777-7777-7777-777777777777', '66666666-6666-6666-6666-666666666666', 'Option A'),
('88888888-8888-8888-8888-888888888888', '66666666-6666-6666-6666-666666666666', 'Option B');

