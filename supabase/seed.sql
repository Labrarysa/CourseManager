INSERT INTO forms (id, title, description, is_quiz)
VALUES 
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'New Student Form', 'Form for collecting student and guardian information', false);

-- Section 1: معلومات الطالب
INSERT INTO sections (id, form_id, title, description)
VALUES 
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'معلومات الطالب', NULL);

-- Section 2: معلومات ولي الأمر
INSERT INTO sections (id, form_id, title, description)
VALUES 
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'معلومات ولي الأمر', NULL);

-- Questions for Section 1: معلومات الطالب
INSERT INTO questions (id, section_id, question_text, type, metadata, correct_answer_id)
VALUES 
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'الإسم الثلاثي', 'text', NULL, NULL),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'البريد الإلكتروني', 'text', NULL, NULL),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'السجل المدني', 'text', NULL, NULL),
('10101010-1010-1010-1010-101010101010', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'الصف الدراسي', 'text', NULL, NULL);

-- Questions for Section 2: معلومات ولي الأمر
INSERT INTO questions (id, section_id, question_text, type, metadata, correct_answer_id)
VALUES 
('11111111-1111-1111-1111-111111111111', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'اسم ولي الأمر', 'text', NULL, NULL),
('22222222-2222-2222-2222-222222222222', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'البريد الإلكتروني', 'text', NULL, NULL),
('33333333-3333-3333-3333-333333333333', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'هاتف ولي الأمر', 'text', NULL, NULL);