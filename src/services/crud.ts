import { Attributes, CreationAttributes, FindOptions, InferAttributes, Model, ModelCtor, ModelStatic, Optional, Order, WhereOptions } from "sequelize";
import CustomError from "../utils/customError";

class CRUD<T extends Model> {
    public model: ModelStatic<T>
    public serviceName: string;

    
    constructor(model: ModelStatic<T>, serviceName: string) {
        this.model = model
        this.serviceName = serviceName
    }
    

    async create(fields: CreationAttributes<T>): Promise<T> {
        const data = await this.model.create(fields);
        // const data = await this.model.create(fields);
        return data;
    }

    async getAll({limit=10, order=[['createdAt', 'DESC']], page=1, query, options}: { limit?: number, page?: number, order?: Order, query?:  WhereOptions<Attributes<T>> | undefined, options?: FindOptions<Attributes<T>> | undefined } = {}) {
        // TODO: change pagination to cursor based
        const lmt = limit > 0 && limit <50 ? Number(limit) : 20
        const pge = page || 1
        const skp = Number(pge * lmt -  lmt) || 0
        this.model.findAll()
        const { count, rows } = await this.model.findAndCountAll({
            where: query,
            offset: skp,
            limit,
            order: order,
            ...options
          });
        // const data = await Promise.all([
        //     this.model(query).order(srt).skip(skp).limit(lmt).populate(populate),
        //     this.model.findAll(query).countDocuments()
        // ])

      if (pge * lmt < count) {
          return {
            page: pge,
            next: pge + 1,
            limit: lmt,
            data: rows,
            total: count,
          };
        }
        return {
          page: pge,
          next: null,
          limit: lmt,
          data: rows,
          total: count,
        };
    }

    async getOne(query: WhereOptions<Attributes<T>>) {
        const data = await this.model.findOne({
          where: query
        })
        if (!data) throw new CustomError(`${this.serviceName} does not exist`, 404)
        return data
    }
    
    async getByPK(id: number, options?:  Omit<FindOptions<InferAttributes<T, { omit: never; }>>, "where"> | undefined) {
        const data = await this.model.findByPk(id, options)
        if (!data) throw new CustomError(`${this.serviceName} does not exist`, 404)
        return data
    }

    async updateOne(where: WhereOptions<Attributes<T>>, body: any) {
      // const whereCondition: { [key: string]: any } = {};
      // whereCondition["id"] = id;
      const data = await this.model.update(body, {
          where,
          // returning: true,
        });
      if (!data) throw new CustomError(`${this.serviceName} does not exist`, 404)
      return data
    }

    async deleteOne(where: WhereOptions<Attributes<T>>) {
        const data = await this.model.destroy({
            where
        })
        if (!data) throw new CustomError(`${this.serviceName} does not exist`, 404)
        return data
    }
}

export default CRUD