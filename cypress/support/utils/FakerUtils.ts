import { faker } from '@faker-js/faker';

export interface FakeUserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  company: string;
  avatar: string;
}

export interface FakeOrderPayload {
  orderId: string;
  customerName: string;
  product: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'APPROVED' | 'SHIPPED' | 'DELIVERED';
  timestamp: string;
}

export class FakerUtils {
  /**
   * Generates a randomized dynamic user profile.
   */
  static generateUserProfile(): FakeUserProfile {
    return {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      jobTitle: faker.person.jobTitle(),
      company: faker.company.name(),
      avatar: faker.image.avatar(),
    };
  }

  /**
   * Generates a list of N randomized dynamic user profiles.
   * 
   * @param count Number of users to generate
   */
  static generateUsersList(count: number = 5): FakeUserProfile[] {
    return Array.from({ length: count }, () => this.generateUserProfile());
  }

  /**
   * Generates a randomized dynamic ecommerce order payload.
   */
  static generateOrderPayload(): FakeOrderPayload {
    return {
      orderId: `ORD-${faker.string.alphanumeric({ length: 8, casing: 'upper' })}`,
      customerName: faker.person.fullName(),
      product: faker.commerce.productName(),
      amount: parseFloat(faker.commerce.price({ min: 10, max: 999 })),
      currency: 'USD',
      status: faker.helpers.arrayElement(['PENDING', 'APPROVED', 'SHIPPED', 'DELIVERED']),
      timestamp: faker.date.recent().toISOString(),
    };
  }
}
