import { Model, ModelCtor, Optional } from "sequelize";

// const CustomError = require('../utils/CustomError')


class CRUD {
    public model: ModelCtor<Model<any, any>>
    public serviceName: string;

    
    constructor(model: ModelCtor<Model<any, any>>, serviceName: string) {
        this.model = model
        this.serviceName = serviceName
    }
    
    async create<T extends Optional<any, string> | undefined,>(fields: T) {
        const data = await this.model.create(fields)
        return data
    }

    async getAll({limit=10, order=['createdAt', 'DESC'], page=1} = {}, query={}, populate='') {
        // TODO: change pagination to cursor based
        console.log('herrr')
        console.log({limit, order, page})
        const lmt = limit > 0 && limit <50 ? Number(limit) : 20
        const srt = order || { createdAt: -1 }
        const pge = page || 1
        const skp = Number(pge * lmt -  lmt) || 0
        const { count, rows } = await this.model.findAndCountAll({
            where: query,
            offset: skp,
            limit,
            order
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

    async getOne(id: string) {
        const data = await this.model.findOne({ where: { id } })
        if (!data) throw new Error(`${this.serviceName} does not exist`)
        return data
    }
    
    async getByPK(id: string) {
        const data = await this.model.findByPk(id)
        if (!data) throw new Error(`${this.serviceName} does not exist`)
        return data
    }

    async updateOne(id: string, body: any) {
        const data = await this.model.update(body, {
            where: {
              id
            }
          });
        if (!data) throw new Error(`${this.serviceName} does not exist`)
        return data
    }

    async deleteOne(id: string) {
        const data = await this.model.destroy({
            where: {
              id
            }
        })
        if (!data) throw new Error(`${this.serviceName} does not exist`)
        return data
    }
}

export default CRUD