-- Grant admin role to user cooljimmy974@gmail.com
INSERT INTO public.user_roles (user_id, role)
VALUES ('7fadb969-4f04-4939-88ac-ac7dc80b3d08', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;