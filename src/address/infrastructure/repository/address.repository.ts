import { EntityRepository, Repository } from "typeorm";
import { CreateAddressDto } from "../controllers/dto/create-address.dto";
import { UpdateAddressDto } from "../controllers/dto/update-address.dto";
import { Address } from "../../domain/address.entity";

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {
  async getAddresss(): Promise<Address[]> {
    const query = this.createQueryBuilder("address").leftJoinAndSelect("address.subAgent", "subAgent");

    const addresss = await query.getMany();
    return addresss;
  }

  async createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    const { department, location, streetName, streetNumber, apto, observation, active } = createAddressDto;

    const address = new Address();
    address.id = 0;
    address.department = department;
    address.location = location;
    address.streetName = streetName;
    address.streetNumber = streetNumber;
    address.apto = apto;
    address.observation = observation;
    address.active = active;
    address.dateOfUpdated = new Date();
    await address.save();
    return address;
  }

  async updateAddress(updateAddressDto: UpdateAddressDto): Promise<Address> {
    const { id, department, location, streetName, streetNumber, apto, observation, active } = updateAddressDto;

    const address = new Address();
    address.id = parseInt(id.toString());
    address.department = department;
    address.location = location;
    address.streetName = streetName;
    address.streetNumber = streetNumber;
    address.apto = apto;
    address.observation = observation;
    address.active = active;
    address.dateOfUpdated = new Date();
    await address.save();
    return address;
  }

  async deleteAddress(id: number): Promise<Address> {
    const address = new Address();
    await this.delete(id);
    return address;
  }

  async updateStateAddress(addressUpdt: Address): Promise<Address> {
    const { id, department, location, streetName, streetNumber, apto, observation, active, dateOfUpdated } = addressUpdt;

    const address = new Address();
    address.id = id;
    address.department = department;
    address.location = location;
    address.streetNumber = streetNumber;
    address.streetName = streetName;
    address.apto = apto;
    address.observation = observation;
    address.active = active;

    await address.save();
    return address;
  }
}
