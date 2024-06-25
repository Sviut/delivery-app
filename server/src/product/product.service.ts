import { BadRequestException, Injectable } from '@nestjs/common'
import { generateSlug } from '../utils/generate-slug'
import { PrismaService } from '../prisma.service'
import { ProductDto } from './dto/product.dto'
import { returnProductObject } from './returnProductObject.object'
import { CategoryService } from '../category/category.service'

@Injectable()
export class ProductService {
	constructor(
		private prismaService: PrismaService,
		private categoryService: CategoryService
	) {}

	async getAll(searchTerm: string): Promise<ProductDto[]> {
		if (searchTerm) return this.search(searchTerm)

		return this.prismaService.product.findMany({
			select: returnProductObject,
			orderBy: {
				createdAt: 'desc'
			}
		})
	}

	async search(searchTerm: string): Promise<ProductDto[]> {
		return this.prismaService.product.findMany({
			where: {
				OR: [
					{
						name: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					},
					{
						description: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				]
			},
			select: returnProductObject
		})
	}

	async getBySlug(slug: string) {
		const product = await this.prismaService.product.findUnique({
			where: { slug },
			select: returnProductObject
		})

		if (!product) throw new BadRequestException('Product not found')

		return product
	}

	async getByCategory(categorySlug: string) {
		const products = await this.prismaService.product.findMany({
			where: {
				category: {
					slug: categorySlug
				}
			},
			select: returnProductObject
		})

		if (!products) throw new BadRequestException('Products not found')

		return products
	}

	async create() {
		return this.prismaService.product.create({
			data: {
				name: '',
				slug: '',
				image: '',
				description: '',
				price: 0
			}
		})
	}

	async update(id: string, dto: ProductDto) {
		const { description, price, image, name, categoryId } = dto

		await this.categoryService.getById(categoryId)

		return this.prismaService.product.update({
			where: { id },
			data: {
				name,
				description,
				price,
				image,
				slug: generateSlug(name),
				category: {
					connect: {
						id: categoryId
					}
				}
			}
		})
	}

	async delete(id: string) {
		return this.prismaService.product.delete({
			where: { id }
		})
	}
}
