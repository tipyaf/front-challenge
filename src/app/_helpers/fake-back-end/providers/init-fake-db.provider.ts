import {InitFakeDbService} from '../services/init-fake-db.service';


export function InitFakeDbProviderFactory(provider: InitFakeDbService) {
  return () => provider.storeFakeDB();
}
