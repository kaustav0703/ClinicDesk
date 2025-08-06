// ****** Importing ****** //
const mongoose = require('mongoose');
const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel');
const Report = require('../models/reportModel');

// ****** Index Management Utility ****** //
class IndexManager {

    // Check if database is connected
    static isConnected() {
        return mongoose.connection.readyState === 1;
    }

    // Create all indexes for the application
    static async createAllIndexes() {
        try {
            // Check if database is connected
            if (!this.isConnected()) {
                console.log('⚠️  Database not connected, skipping index creation');
                return false;
            }

            console.log('🔄 Creating database indexes...');

            // Create indexes for Doctor collection
            await Doctor.createIndexes();
            console.log('✅ Doctor indexes created successfully');

            // Create indexes for Patient collection
            await Patient.createIndexes();
            console.log('✅ Patient indexes created successfully');

            // Create indexes for Report collection
            await Report.createIndexes();
            console.log('✅ Report indexes created successfully');

            console.log('🎉 All database indexes created successfully!');
            return true;
        } catch (error) {
            console.error('❌ Error creating indexes:', error.message);
            return false;
        }
    }

    // Get index information for all collections
    static async getIndexInfo() {
        try {
            if (!this.isConnected()) {
                console.log('⚠️  Database not connected');
                return null;
            }

            const db = mongoose.connection.db;
            const collections = ['doctors', 'patients', 'reports'];
            const indexInfo = {};

            for (const collectionName of collections) {
                try {
                    const collection = db.collection(collectionName);
                    const indexes = await collection.indexes();
                    indexInfo[collectionName] = indexes;
                } catch (error) {
                    console.log(`⚠️  Could not get indexes for ${collectionName}:`, error.message);
                    indexInfo[collectionName] = [];
                }
            }

            return indexInfo;
        } catch (error) {
            console.error('❌ Error getting index info:', error.message);
            return null;
        }
    }

    // Drop all indexes (use with caution)
    static async dropAllIndexes() {
        try {
            if (!this.isConnected()) {
                console.log('⚠️  Database not connected');
                return false;
            }

            console.log('⚠️  Dropping all indexes...');

            const db = mongoose.connection.db;
            const collections = ['doctors', 'patients', 'reports'];

            for (const collectionName of collections) {
                try {
                    const collection = db.collection(collectionName);
                    await collection.dropIndexes();
                    console.log(`✅ Dropped indexes for ${collectionName}`);
                } catch (error) {
                    console.log(`⚠️  Could not drop indexes for ${collectionName}:`, error.message);
                }
            }

            console.log('🎉 All indexes dropped successfully!');
            return true;
        } catch (error) {
            console.error('❌ Error dropping indexes:', error.message);
            return false;
        }
    }

    // Analyze query performance
    static async analyzeQuery(query, collectionName) {
        try {
            if (!this.isConnected()) {
                console.log('⚠️  Database not connected');
                return null;
            }

            const db = mongoose.connection.db;
            const collection = db.collection(collectionName);

            // Enable query profiling
            await db.command({ profile: 2 });

            // Execute the query
            const startTime = Date.now();
            const result = await query;
            const endTime = Date.now();

            // Disable query profiling
            await db.command({ profile: 0 });

            return {
                executionTime: endTime - startTime,
                resultCount: Array.isArray(result) ? result.length : 1,
                timestamp: new Date()
            };
        } catch (error) {
            console.error('❌ Error analyzing query:', error.message);
            return null;
        }
    }

    // Get collection statistics
    static async getCollectionStats() {
        try {
            if (!this.isConnected()) {
                console.log('⚠️  Database not connected');
                return null;
            }

            const db = mongoose.connection.db;
            const collections = ['doctors', 'patients', 'reports'];
            const stats = {};

            for (const collectionName of collections) {
                try {
                    const collection = db.collection(collectionName);
                    const collectionStats = await collection.stats();
                    stats[collectionName] = {
                        count: collectionStats.count,
                        size: collectionStats.size,
                        avgObjSize: collectionStats.avgObjSize,
                        storageSize: collectionStats.storageSize,
                        indexes: collectionStats.nindexes
                    };
                } catch (error) {
                    console.log(`⚠️  Could not get stats for ${collectionName}:`, error.message);
                    stats[collectionName] = {
                        count: 0,
                        size: 0,
                        avgObjSize: 0,
                        storageSize: 0,
                        indexes: 0
                    };
                }
            }

            return stats;
        } catch (error) {
            console.error('❌ Error getting collection stats:', error.message);
            return null;
        }
    }
}

// ****** Exports ****** //
module.exports = IndexManager; 