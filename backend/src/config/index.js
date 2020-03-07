'use strict';
import express from './components/express';
import role from './components/role';
import database from './components/database';
export default Object.assign({}, express, role, database);