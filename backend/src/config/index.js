'use strict';
import express from './components/express';
import role from './components/role';
import database from './components/database';
import session from './components/session';
export default Object.assign({}, express, role, database, session);