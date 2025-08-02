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

                // Pet-related schemas
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
                PetResponse: {
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
            },
        },
    },
    apis: ['./src/routes/*.ts'], // auto-scan route files
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
