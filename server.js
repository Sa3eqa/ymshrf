// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
    origin: ['https://ymshrf.netlify.app', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());

// MongoDB Connection - هنا المونقو!
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ymshrf73_db_user:QLCG2yfJrQdmYAVf@hjey.bv0mypb.mongodb.net/portfolio?retryWrites=true&w=majority&appName=HJEY';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Connected to MongoDB Atlas');
}).catch(err => {
    console.error('❌ MongoDB connection error:', err);
});

// Schema
const SiteDataSchema = new mongoose.Schema({
    dataId: { type: String, default: 'main', unique: true },
    profileImage: String,
    paymentImage: String,
    fullName: String,
    jobTitle: String,
    heroSubtitle: String,
    countryAge: String,
    aboutText: String,
    services: Array,
    skills: Array,
    colors: Object,
    adminData: {
        email: String,
        password: String,
        webhookUrl: String
    },
    lastUpdated: { type: Date, default: Date.now }
});

const SiteData = mongoose.model('SiteData', SiteDataSchema);

// Routes

// Get all data
app.get('/api/data', async (req, res) => {
    try {
        let data = await SiteData.findOne({ dataId: 'main' });
        
        // إذا ما فيه بيانات، أنشئ بيانات افتراضية
        if (!data) {
            data = new SiteData({
                dataId: 'main',
                profileImage: 'https://i.ibb.co/RkbvkX46/884c124575f9.jpg',
                paymentImage: 'https://i.thteam.me/V-4_njNgDp.jpg',
                fullName: 'يوسف بن احمد آل مشرف',
                jobTitle: 'مطور سعودي',
                heroSubtitle: 'الصفحة الرئيسية',
                countryAge: 'سعودي - 15y',
                aboutText: 'الاسم : يوسف احمد عبد الحميد مشرف<br>طالب متوسط بالفراهيدي<br>مبرمج ( مبتدئ ) حاليا بنقوى مع الوقت باذن الله<br>سعودي تحديدا من المدينة',
                services: [
                    {
                        icon: 'fa-laptop-code',
                        title: 'تطوير المواقع',
                        desc: 'أسوي لك مواقع حديثة وسريعة بأحدث التقنيات'
                    },
                    {
                        icon: 'fa-shopping-cart',
                        title: 'أنظمة الطلبات',
                        desc: 'أسوي أنظمة طلبات وإدارة احترافية'
                    },
                    {
                        icon: 'fa-credit-card',
                        title: 'وسائل الدفع',
                        desc: 'اسويلك طرق دفع احترافية'
                    },
                    {
                        icon: 'fa-tags',
                        title: 'إدارة الأسعار',
                        desc: 'اعرف اسعار المنتج والسعر السوقي'
                    }
                ],
                skills: [
                    { icon: 'fab fa-html5', name: 'HTML5' },
                    { icon: 'fab fa-css3-alt', name: 'CSS3' },
                    { icon: 'fab fa-js', name: 'JavaScript' },
                    { icon: 'fab fa-python', name: 'Python' },
                    { icon: 'fab fa-react', name: 'React' },
                    { icon: 'fab fa-node', name: 'Node.js' }
                ],
                colors: {
                    primary: '#4a1a7e',
                    secondary: '#2d1150',
                    accent: '#6b3fa0',
                    bgDark: '#0d0618',
                    bgCard: 'rgba(29, 14, 50, 0.95)',
                    textLight: '#e8dff5',
                    textMuted: '#b8a9d1'
                },
                adminData: {
                    email: 'qysai32324@gmail.com',
                    password: 'yosef1rr1rg',
                    webhookUrl: 'https://discord.com/api/webhooks/1442052597174370327/06AgH_PwGa9_y6WywVR76rgrnh68wu7cipSJOSlQWUgbeh8A42iDUmaCeBcvkd-mXbW5'
                }
            });
            await data.save();
        }
        
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Update all data
app.post('/api/data', async (req, res) => {
    try {
        const updatedData = req.body;
        updatedData.lastUpdated = new Date();
        
        const data = await SiteData.findOneAndUpdate(
            { dataId: 'main' },
            updatedData,
            { new: true, upsert: true }
        );
        
        res.json({ success: true, data });
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'Failed to update data' });
    }
});

// Verify admin credentials
app.post('/api/verify-admin', async (req, res) => {
    try {
        const { code } = req.body;
        
        if (code === 'ymshrf') {
            const data = await SiteData.findOne({ dataId: 'main' });
            res.json({ 
                success: true, 
                adminData: data.adminData 
            });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        res.status(500).json({ error: 'Verification failed' });
    }
});

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'Server is running ✅', mongodb: mongoose.connection.readyState === 1 ? 'Connected ✅' : 'Disconnected ❌' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
    origin: ['https://ymshrf.netlify.app', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());

// MongoDB Connection - هنا المونقو!
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ymshrf73_db_user:QLCG2yfJrQdmYAVf@hjey.bv0mypb.mongodb.net/portfolio?retryWrites=true&w=majority&appName=HJEY';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Connected to MongoDB Atlas');
}).catch(err => {
    console.error('❌ MongoDB connection error:', err);
});

// Schema
const SiteDataSchema = new mongoose.Schema({
    dataId: { type: String, default: 'main', unique: true },
    profileImage: String,
    paymentImage: String,
    fullName: String,
    jobTitle: String,
    heroSubtitle: String,
    countryAge: String,
    aboutText: String,
    services: Array,
    skills: Array,
    colors: Object,
    adminData: {
        email: String,
        password: String,
        webhookUrl: String
    },
    lastUpdated: { type: Date, default: Date.now }
});

const SiteData = mongoose.model('SiteData', SiteDataSchema);

// Routes

// Get all data
app.get('/api/data', async (req, res) => {
    try {
        let data = await SiteData.findOne({ dataId: 'main' });
        
        // إذا ما فيه بيانات، أنشئ بيانات افتراضية
        if (!data) {
            data = new SiteData({
                dataId: 'main',
                profileImage: 'https://i.ibb.co/RkbvkX46/884c124575f9.jpg',
                paymentImage: 'https://i.thteam.me/V-4_njNgDp.jpg',
                fullName: 'يوسف بن احمد آل مشرف',
                jobTitle: 'مطور سعودي',
                heroSubtitle: 'الصفحة الرئيسية',
                countryAge: 'سعودي - 15y',
                aboutText: 'الاسم : يوسف احمد عبد الحميد مشرف<br>طالب متوسط بالفراهيدي<br>مبرمج ( مبتدئ ) حاليا بنقوى مع الوقت باذن الله<br>سعودي تحديدا من المدينة',
                services: [
                    {
                        icon: 'fa-laptop-code',
                        title: 'تطوير المواقع',
                        desc: 'أسوي لك مواقع حديثة وسريعة بأحدث التقنيات'
                    },
                    {
                        icon: 'fa-shopping-cart',
                        title: 'أنظمة الطلبات',
                        desc: 'أسوي أنظمة طلبات وإدارة احترافية'
                    },
                    {
                        icon: 'fa-credit-card',
                        title: 'وسائل الدفع',
                        desc: 'اسويلك طرق دفع احترافية'
                    },
                    {
                        icon: 'fa-tags',
                        title: 'إدارة الأسعار',
                        desc: 'اعرف اسعار المنتج والسعر السوقي'
                    }
                ],
                skills: [
                    { icon: 'fab fa-html5', name: 'HTML5' },
                    { icon: 'fab fa-css3-alt', name: 'CSS3' },
                    { icon: 'fab fa-js', name: 'JavaScript' },
                    { icon: 'fab fa-python', name: 'Python' },
                    { icon: 'fab fa-react', name: 'React' },
                    { icon: 'fab fa-node', name: 'Node.js' }
                ],
                colors: {
                    primary: '#4a1a7e',
                    secondary: '#2d1150',
                    accent: '#6b3fa0',
                    bgDark: '#0d0618',
                    bgCard: 'rgba(29, 14, 50, 0.95)',
                    textLight: '#e8dff5',
                    textMuted: '#b8a9d1'
                },
                adminData: {
                    email: 'qysai32324@gmail.com',
                    password: 'yosef1rr1rg',
                    webhookUrl: 'https://discord.com/api/webhooks/1442052597174370327/06AgH_PwGa9_y6WywVR76rgrnh68wu7cipSJOSlQWUgbeh8A42iDUmaCeBcvkd-mXbW5'
                }
            });
            await data.save();
        }
        
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Update all data
app.post('/api/data', async (req, res) => {
    try {
        const updatedData = req.body;
        updatedData.lastUpdated = new Date();
        
        const data = await SiteData.findOneAndUpdate(
            { dataId: 'main' },
            updatedData,
            { new: true, upsert: true }
        );
        
        res.json({ success: true, data });
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'Failed to update data' });
    }
});

// Verify admin credentials
app.post('/api/verify-admin', async (req, res) => {
    try {
        const { code } = req.body;
        
        if (code === 'ymshrf') {
            const data = await SiteData.findOne({ dataId: 'main' });
            res.json({ 
                success: true, 
                adminData: data.adminData 
            });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        res.status(500).json({ error: 'Verification failed' });
    }
});

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'Server is running ✅', mongodb: mongoose.connection.readyState === 1 ? 'Connected ✅' : 'Disconnected ❌' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
