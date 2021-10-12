import { EntityRepository, Repository } from 'typeorm';
import { CreateAddressDto } from '../controllers/dto/create-address.dto';
import { UpdateAddressDto } from '../controllers/dto/update-address.dto';
import { Address } from '../../domain/address.entity';

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {
  
  
  async getAddresss(): Promise<Address[]> {
    const query = this.createQueryBuilder('address');

    const addresss = await query.getMany();
    return addresss;
  }

  async createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    const {  department, location, streetName, streetNumber,apto,observationAddress,active } = createAddressDto;

    const address = new Address();
     
    address.department = department;
    address.location = location;
    address.streetName = streetName;
    address.streetNumber = streetNumber;
    address.apto = apto;
    address.observationAddress = observationAddress;
    address.active = active;
    await address.save();
    return address;
  }

  async updateAddress(createAddressDto: UpdateAddressDto): Promise<Address> {
    const {  department, location, streetName, streetNumber,apto,observationAddress,active } = createAddressDto;

    const address = new Address();
     
    address.department = department;
    address.location = location;
    address.streetName = streetName;
    address.streetNumber = streetNumber;
    address.apto = apto;
    address.observationAddress = observationAddress;
    address.active = active;
    await address.save();
    return address;
  }

  
  
  async deleteAddress(id: number ) : Promise<Address> {
    const address = new Address();
      await this.delete(id);
      return address;
  }

   

}
