import should from 'should';
import createSchemaDefinition from '../../../../src/route/openapi/createSchemaDefinition';
import { openapi } from '../../../../src/route';

describe('createSchemaDefinition', () => {
	it('Given a decorated class, it should create a schema definition', () => {
		@openapi.definition({ title: 'Customer' })
		class Customer {
			@openapi.prop()
			firstname: string;
			@openapi.prop()
			lastname: string;
		}

		const definition = createSchemaDefinition(Customer);
		should(definition).be.deepEqual({
			Customer: {
				title: 'Customer',
				type: 'object',
				properties: {
					firstname: {
						type: 'string'
					},
					lastname: {
						type: 'string'
					}
				}
			}
		});
	});

	it('supports nested objects', () => {
		class CustomerPhone {
			@openapi.prop()
			number: string;
			@openapi.prop()
			isPrimary: boolean;
		}

		@openapi.definition({ title: 'Customer' })
		class Customer {
			@openapi.prop()
			phone: CustomerPhone;
		}

		const definition = createSchemaDefinition(Customer);
		should(definition).be.deepEqual({
			Customer: {
				title: 'Customer',
				type: 'object',
				properties: {
					phone: {
						title: 'phone',
						type: 'object',
						properties: {
							number: {
								type: 'string'
							},
							isPrimary: {
								type: 'boolean'
							}
						}
					}
				}
			}
		});
	});

	it('supports nested definitions', () => {
		@openapi.definition({ title: 'CustomerPhone' })
		class CustomerPhone {
			@openapi.prop()
			number: string;

			@openapi.prop()
			isPrimary: boolean;
		}

		@openapi.definition({ title: 'Customer' })
		class Customer {
			@openapi.prop({ type: CustomerPhone })
			phone: CustomerPhone;
		}

		const definition = createSchemaDefinition(Customer);
		should(definition).be.deepEqual({
			CustomerPhone: {
				title: 'CustomerPhone',
				type: 'object',
				properties: {
					number: {
						type: 'string'
					},
					isPrimary: {
						type: 'boolean'
					}
				}
			},
			Customer: {
				title: 'Customer',
				type: 'object',
				properties: {
					phone: {
						$ref: '#/definitions/CustomerPhone'
					}
				}
			}
		});
	});

	it('supports arrays', () => {
		@openapi.definition({ title: 'Customer' })
		class Customer {
			@openapi.prop({ type: [String] })
			groups: string[];
		}

		const definition = createSchemaDefinition(Customer);
		should(definition).be.deepEqual({
			Customer: {
				title: 'Customer',
				type: 'object',
				properties: {
					groups: {
						type: 'array',
						items: {
							type: 'string'
						}
					}
				}
			}
		});
	});

	it('support array of objects', () => {
		class CustomerPhone {
			@openapi.prop()
			number: string;
			@openapi.prop()
			isPrimary: boolean;
		}

		@openapi.definition({ title: 'Customer' })
		class Customer {
			@openapi.prop({ type: [CustomerPhone] })
			phone: CustomerPhone[];
		}

		const definition = createSchemaDefinition(Customer);
		should(definition).be.deepEqual({
			Customer: {
				title: 'Customer',
				type: 'object',
				properties: {
					phone: {
						type: 'array',
						items: {
							title: 'phone',
							type: 'object',
							properties: {
								number: {
									type: 'string'
								},
								isPrimary: {
									type: 'boolean'
								}
							}
						}
					}
				}
			}
		});
	});

	it('support array of definitions', () => {
		class CustomerPhone {
			number: string;
			isPrimary: boolean;
		}

		class Customer {
			phone: CustomerPhone[];
		}

		openapi.definition({ title: 'Customer' })(Customer);
		openapi.prop({ type: [CustomerPhone] })(Customer.prototype, 'phone');

		openapi.definition({ title: 'CustomerPhone' })(CustomerPhone);
		openapi.prop({ type: String })(CustomerPhone.prototype, 'number');
		openapi.prop({ type: Boolean })(CustomerPhone.prototype, 'isPrimary');

		/**
		 * This is equivalent to:
		 *
		 * @openapi.definition({ title: 'CustomerPhone' })
		 * class CustomerPhone {
		 * 		@openapi.prop()
		 *  	number: number;
		 * 		@openapi.prop()
		 *  	isPrimary: boolean;
		 *  };
		 *
		 * @openapi.definition({ title: 'Customer' })
		 * class Customer {
		 * 		@openapi.prop()
		 *  	phone: CustomerPhone[];
		 *  };
		 */

		const definition = createSchemaDefinition(Customer);
		should(definition).be.deepEqual({
			CustomerPhone: {
				title: 'CustomerPhone',
				type: 'object',
				properties: {
					number: {
						type: 'string'
					},
					isPrimary: {
						type: 'boolean'
					}
				}
			},
			Customer: {
				title: 'Customer',
				type: 'object',
				properties: {
					phone: {
						type: 'array',
						items: {
							$ref: '#/definitions/CustomerPhone'
						}
					}
				}
			}
		});
	});

	it('should populate the required array', () => {
		@openapi.definition({ title: 'Customer' })
		class Customer {
			@openapi.prop({ required: true })
			firstname: string;
			@openapi.prop()
			lastname: string;
		}

		const definition = createSchemaDefinition(Customer);
		should(definition).be.deepEqual({
			Customer: {
				title: 'Customer',
				type: 'object',
				properties: {
					firstname: {
						type: 'string'
					},
					lastname: {
						type: 'string'
					}
				},
				required: ['firstname']
			}
		});
	});

	it('support passing advanced JSON schema options via `rawSchemaOptions` argument', () => {
		@openapi.definition({ title: 'Customer' })
		class Customer {
			@openapi.prop({ required: true, rawSchemaOptions: { oneOf: [{ type: 'object' }, { type: 'array' }] } })
			customData: string;
		}

		const definition = createSchemaDefinition(Customer);
		should(definition).be.deepEqual({
			Customer: {
				title: 'Customer',
				type: 'object',
				properties: {
					customData: {
						type: 'string',
						oneOf: [
							{
								type: 'object'
							},
							{
								type: 'array'
							}
						]
					}
				},
				required: ['customData']
			}
		});
	});
});
