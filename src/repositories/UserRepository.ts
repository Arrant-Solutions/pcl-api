import { IUser } from '../models/user';
import {BaseRepository, RepositoryI} from './BaseRepository'

class UserRepository extends BaseRepository<IUser> implements RepositoryI {}
