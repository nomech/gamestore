export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	// Allows to automatically instantiate createClient with right options
	// instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
	__InternalSupabase: {
		PostgrestVersion: '13.0.4';
	};
	public: {
		Tables: {
			games: {
				Row: {
					created_at: string;
					details: string | null;
					developer: string | null;
					genre: number;
					id: number;
					image_url: string | null;
					platform: number;
					price: number | null;
					publisher: string | null;
					release_date: string | null;
					title: string;
					banner_url: string;
					logo_url: string;
				};
				Insert: {
					created_at?: string;
					details?: string | null;
					developer?: string | null;
					genre?: number | null;
					id?: number;
					image_url?: string | null;
					platform?: number | null;
					price?: number | null;
					publisher?: string | null;
					release_date?: string | null;
					title?: string | null;
				};
				Update: {
					created_at?: string;
					details?: string | null;
					developer?: string | null;
					genre?: number | null;
					id?: number;
					image_url?: string | null;
					platform?: number | null;
					price?: number | null;
					publisher?: string | null;
					release_date?: string | null;
					title?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'games_genre_fkey';
						columns: ['genre'];
						isOneToOne: false;
						referencedRelation: 'genre';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'games_platform_fkey';
						columns: ['platform'];
						isOneToOne: false;
						referencedRelation: 'platform';
						referencedColumns: ['id'];
					}
				];
			};
			genre: {
				Row: {
					created_at: string;
					genre: string;
					id: number;
				};
				Insert: {
					created_at?: string;
					genre?: string;
					id?: number;
				};
				Update: {
					created_at?: string;
					genre?: string | null;
					id?: number;
				};
				Relationships: [];
			};
			order_items: {
				Row: {
					created_at: string;
					id: string;
					name: string | null;
					order_id: string | null;
					product_id: number | null;
					quantity: number | null;
					unit_price: number | null;
				};
				Insert: {
					created_at?: string;
					id?: string;
					name?: string | null;
					order_id?: string | null;
					product_id?: number | null;
					quantity?: number | null;
					unit_price?: number | null;
				};
				Update: {
					created_at?: string;
					id?: string;
					name?: string | null;
					order_id?: string | null;
					product_id?: number | null;
					quantity?: number | null;
					unit_price?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: 'order_items_order_id_fkey';
						columns: ['order_id'];
						isOneToOne: false;
						referencedRelation: 'orders';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'order_items_order_id_fkey';
						columns: ['order_id'];
						isOneToOne: false;
						referencedRelation: 'user_orders';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'order_items_product_id_fkey';
						columns: ['product_id'];
						isOneToOne: false;
						referencedRelation: 'games';
						referencedColumns: ['id'];
					}
				];
			};
			orders: {
				Row: {
					amount_due: number | null;
					cancelled_at: string | null;
					created_at: string;
					currency: string | null;
					customer_email: string | null;
					customer_name: string | null;
					customer_phone: string | null;
					customer_snapshot: Json | null;
					email: string | null;
					fulfillment_status: string | null;
					grand_total: number | null;
					id: string;
					metadata: Json | null;
					order_number: string;
					order_status: string | null;
					paid_at: string | null;
					payment_status: string | null;
					placed_at: string | null;
					shipping_address: Json | null;
					subtotal: number | null;
					tax_total: number | null;
					updated_at: string | null;
					user_id: string | null;
				};
				Insert: {
					amount_due?: number | null;
					cancelled_at?: string | null;
					created_at?: string;
					currency?: string | null;
					customer_email?: string | null;
					customer_name?: string | null;
					customer_phone?: string | null;
					customer_snapshot?: Json | null;
					email?: string | null;
					fulfillment_status?: string | null;
					grand_total?: number | null;
					id?: string;
					metadata?: Json | null;
					order_number: string;
					order_status?: string | null;
					paid_at?: string | null;
					payment_status?: string | null;
					placed_at?: string | null;
					shipping_address?: Json | null;
					subtotal?: number | null;
					tax_total?: number | null;
					updated_at?: string | null;
					user_id?: string | null;
				};
				Update: {
					amount_due?: number | null;
					cancelled_at?: string | null;
					created_at?: string;
					currency?: string | null;
					customer_email?: string | null;
					customer_name?: string | null;
					customer_phone?: string | null;
					customer_snapshot?: Json | null;
					email?: string | null;
					fulfillment_status?: string | null;
					grand_total?: number | null;
					id?: string;
					metadata?: Json | null;
					order_number?: string;
					order_status?: string | null;
					paid_at?: string | null;
					payment_status?: string | null;
					placed_at?: string | null;
					shipping_address?: Json | null;
					subtotal?: number | null;
					tax_total?: number | null;
					updated_at?: string | null;
					user_id?: string | null;
				};
				Relationships: [];
			};
			platform: {
				Row: {
					created_at: string;
					id: number;
					platform: string | null;
				};
				Insert: {
					created_at?: string;
					id?: number;
					platform?: string | null;
				};
				Update: {
					created_at?: string;
					id?: number;
					platform?: string | null;
				};
				Relationships: [];
			};
		};
		Views: {
			user_orders: {
				Row: {
					created_at: string | null;
					currency: string | null;
					customer_email: string | null;
					customer_name: string | null;
					customer_phone: string | null;
					grand_total: number | null;
					id: string | null;
					items: Json | null;
					order_number: string | null;
					order_status: string | null;
				};
				Insert: {
					created_at?: string | null;
					currency?: string | null;
					customer_email?: string | null;
					customer_name?: string | null;
					customer_phone?: string | null;
					grand_total?: number | null;
					id?: string | null;
					items?: never;
					order_number?: string | null;
					order_status?: string | null;
				};
				Update: {
					created_at?: string | null;
					currency?: string | null;
					customer_email?: string | null;
					customer_name?: string | null;
					customer_phone?: string | null;
					grand_total?: number | null;
					id?: string | null;
					items?: never;
					order_number?: string | null;
					order_status?: string | null;
				};
				Relationships: [];
			};
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			currency: 'NOK' | 'USD' | 'EUR';
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
				DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
		: never = never
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
			DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
	  }
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
			DefaultSchema['Views'])
	? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
			Row: infer R;
	  }
		? R
		: never
	: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema['Tables']
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
		: never = never
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
	  }
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
	? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
			Insert: infer I;
	  }
		? I
		: never
	: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema['Tables']
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
		: never = never
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
	  }
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
	? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
			Update: infer U;
	  }
		? U
		: never
	: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		| keyof DefaultSchema['Enums']
		| { schema: keyof DatabaseWithoutInternals },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
		: never = never
> = DefaultSchemaEnumNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
	? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
	: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema['CompositeTypes']
		| { schema: keyof DatabaseWithoutInternals },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
		: never = never
> = PublicCompositeTypeNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
	? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
	: never;

export const Constants = {
	public: {
		Enums: {
			currency: ['NOK', 'USD', 'EUR'],
		},
	},
} as const;
