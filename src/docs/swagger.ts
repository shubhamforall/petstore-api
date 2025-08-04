import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Petstore API',
            version: '1.0.0',
            description: 'API for managing users and pets with JWT-based RBAC',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                LoginRequest: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            example: 'user@example.com',
                        },
                        password: {
                            type: 'string',
                            example: 'Shubham@123',
                        },
                    },
                },
                LoginResponse: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'object',
                            properties: {
                                token: {
                                    type: 'string',
                                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                                },
                                user: {
                                    type: 'object',
                                    properties: {
                                        id: {
                                            type: 'string',
                                            example: 'abc123-user-id',
                                        },
                                        email: {
                                            type: 'string',
                                            example: 'user@example.com',
                                        },
                                        role: {
                                            type: 'string',
                                            example: 'Admin',
                                        },
                                        firstName: {
                                            type: 'string',
                                            example: 'Shubham',
                                        },
                                        lastName: {
                                            type: 'string',
                                            example: 'Patil',
                                        },
                                    },
                                },
                            },
                        },
                        errors: {
                            type: 'array',
                            nullable: true,
                            items: { type: 'object' },
                        },
                        messages: {
                            type: 'object',
                            properties: {
                                message: {
                                    type: 'string',
                                    example: 'Login successful',
                                },
                            },
                        },
                        status_code: {
                            type: 'integer',
                            example: 200,
                        },
                        is_success: {
                            type: 'boolean',
                            example: true,
                        },
                    },
                },
                CreateUserDTO: {
                    type: 'object',
                    required: ['email', 'password', 'role'],
                    properties: {
                        email: { type: 'string', example: 'user@example.com' },
                        password: { type: 'string', example: 'Password@123' },
                        role: {
                            type: 'string',
                            enum: ['SuperAdmin', 'Admin', 'User'],
                            example: 'Admin'
                        },
                        firstName: { type: 'string', example: 'John' },
                        lastName: { type: 'string', example: 'Doe' },
                        phoneNumber: { type: 'string', example: '+911234567890' },
                    },
                },
                UserResponse: {
                    type: 'object',
                    properties: {
                        data: { $ref: '#/components/schemas/CreateUserDTO' },
                        errors: {
                            type: 'array',
                            nullable: true,
                            items: { type: 'object' },
                        },
                        messages: {
                            type: 'object',
                            properties: {
                                message: { type: 'string', example: 'User created successfully' },
                            },
                        },
                        status_code: { type: 'integer', example: 201 },
                        is_success: { type: 'boolean', example: true },
                    },
                },
                UserListResponse: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/CreateUserDTO' },
                        },
                        errors: {
                            type: 'array',
                            nullable: true,
                            items: { type: 'object' },
                        },
                        messages: {
                            type: 'object',
                            properties: {
                                message: { type: 'string', example: 'Users fetched successfully' },
                            },
                        },
                        status_code: { type: 'integer', example: 200 },
                        is_success: { type: 'boolean', example: true },
                    },
                },

                AddPetDTO: {
                    type: 'object',
                    required: ['name', 'type', 'age'],
                    properties: {
                        name: { type: 'string', example: 'Buddy' },
                        type: { type: 'string', example: 'Dog' },
                        breed: { type: 'string', example: 'Labrador' },
                        age: { type: 'integer', example: 3 },
                        description: { type: 'string', example: 'Friendly and energetic' },
                        images: {
                            type: 'array',
                            items: {
                                type: 'string',
                                format: 'binary',
                            },
                        },
                    },
                },
                PatchPetDTO: {
                    type: 'object',
                    properties: {
                        type: { type: 'string', example: 'Cat' },
                        breed: { type: 'string', example: 'Persian' },
                        age: { type: 'integer', example: 2 },
                        description: { type: 'string', example: 'Calm and cuddly' },
                    },
                },
                PutPetDTO: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', example: 'Rocky' },
                        type: { type: 'string', example: 'Cat' },
                        breed: { type: 'string', example: 'Persian' },
                        age: { type: 'integer', example: 2 },
                        description: { type: 'string', example: 'Calm and cuddly' },
                    },
                },
                PetImage: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 'img-uuid' },
                        url: { type: 'string', example: '/uploads/image1.jpg' },
                        petId: { type: 'string', example: 'pet-uuid' },
                        createdAt: { type: 'string', format: 'date-time', example: '2025-08-01T10:00:00Z' },
                    },
                },
                Pet: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 'pet-uuid' },
                        name: { type: 'string', example: 'Buddy' },
                        type: { type: 'string', example: 'Dog' },
                        breed: { type: 'string', nullable: true, example: 'Beagle' },
                        age: { type: 'integer', example: 3 },
                        description: { type: 'string', nullable: true, example: 'Playful and loyal' },
                        createdAt: { type: 'string', format: 'date-time', example: '2025-08-01T10:00:00Z' },
                        updatedAt: { type: 'string', format: 'date-time', example: '2025-08-02T11:00:00Z' },
                        images: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/PetImage' },
                        },
                    },
                },
                PetAddResponse: {
                    type: 'object',
                    properties: {
                        data: { $ref: '#/components/schemas/Pet' },
                        errors: {
                            type: 'array',
                            nullable: true,
                            items: { type: 'object' },
                        },
                        messages: {
                            type: 'object',
                            properties: {
                                message: { type: 'string', example: 'Pet added successfully' },
                            },
                        },
                        status_code: { type: 'integer', example: 201 },
                        is_success: { type: 'boolean', example: true },
                    },
                },
                PetListResponse: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'object',
                            properties: {
                                pets: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Pet' },
                                },
                                count: { type: 'integer', example: 1 },
                                pagesAvailable: { type: 'integer', example: 1 },
                            },
                        },
                        errors: {
                            type: 'array',
                            nullable: true,
                            items: { type: 'object' },
                        },
                        messages: {
                            type: 'object',
                            properties: {
                                message: { type: 'string', example: 'Pets fetched successfully' },
                            },
                        },
                        status_code: { type: 'integer', example: 200 },
                        is_success: { type: 'boolean', example: true },
                    },
                },
                UpdatePetResponse: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'object',
                            properties: {
                                id: { type: 'string', format: 'uuid', example: '1e896666-27f6-408d-af15-45a02865cdf7' },
                                name: { type: 'string', example: 'Mimosa' },
                                type: { type: 'string', example: 'Cat' },
                                breed: { type: 'string', example: 'Persian Cat' },
                                age: { type: 'integer', example: 4 },
                                description: { type: 'string', example: 'Friendly and active\n' },
                                createdAt: { type: 'string', format: 'date-time', example: '2025-08-04T13:03:05.787Z' },
                                updatedAt: { type: 'string', format: 'date-time', example: '2025-08-04T13:30:25.955Z' },
                            },
                            required: ['id', 'name', 'type', 'breed', 'age', 'createdAt', 'updatedAt'],
                        },
                        errors: { type: 'null', nullable: true },
                        messages: {
                            type: 'object',
                            properties: {
                                message: { type: 'string', example: 'Pet updated successfully' },
                            },
                            required: ['message'],
                        },
                        status_code: { type: 'integer', example: 200 },
                        is_success: { type: 'boolean', example: true },
                    },
                    required: ['data', 'errors', 'messages', 'status_code', 'is_success'],
                },

                BadRequestResponse: {
                    type: 'object',
                    properties: {
                        data: { type: 'null' },
                        errors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    code: { type: 'string', example: 'INVALID' },
                                    message: { type: 'string', example: 'Invalid data.' },
                                    field: { type: 'string', example: 'field_name' },
                                },
                                required: ['code', 'message', 'field'],
                            },
                        },
                        status_code: { type: 'integer', example: 400 },
                        is_success: { type: 'boolean', example: false },
                    },
                    required: ['data', 'errors', 'status_code', 'is_success'],
                },

                UnauthorizedResponse: {
                    type: 'object',
                    properties: {
                        data: { type: 'null' },
                        errors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'Unauthorized' },
                                    code: { type: 'string', example: 'UNAUTHORIZED' },
                                },
                            },
                        },
                        messages: {
                            type: 'object',
                            properties: {
                                message: { type: 'string', example: 'You are not authorized to access this resource' },
                            },
                        },
                        status_code: { type: 'integer', example: 401 },
                        is_success: { type: 'boolean', example: false },
                    },
                }

            },
        },
    },
    apis: ['./src/routes/*.ts'], // auto-scan route files
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
