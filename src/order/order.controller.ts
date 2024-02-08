import { Controller, Post } from '@nestjs/common';

@Controller('order')
export class OrderController {
  @Post()
  createOrder() {
    return {
      orderId: 1,
      userId: 'user',
      orderItems: [
        { menuId: 1, quantity: 1, itemTotalPrice: 500 },
        { menuId: 2, quantity: 2, itemTotalPrice: 1000 },
      ],
      totalPrice: 2500,
      remainingPoints: 500,
    };
  }
}
