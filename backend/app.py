from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
# السماح بطلبات من سيرفر React
CORS(app)

# قمنا بتوسيع قاعدة البيانات لتشمل التفاصيل الدقيقة التي تحتاجها صفحة الملف الشخصي
patients_data = [
    {
        "id": "040105001", 
        "name": "أحمد العتيبي", 
        "age": 35, 
        "gender": "ذكر",              # إضافة الجنس
        "socialStatus": "أعزب",       # إضافة الحالة الاجتماعية
        "dob": "12/1/1989",           # إضافة تاريخ الميلاد
        "phone": "0994616117",        # إضافة رقم الهاتف
        "address": "حمص - الفاخورة",  # إضافة العنوان
        "workAddress": "حمص - المدينة",# إضافة عنوان العمل
        "lastVisit": "12/12/2025", 
        "code": "J11.1",
        "visits": [                   # إضافة مصفوفة الزيارات
            {"code": "J11.1", "date": "12/12/2025", "hospital": "مشفى الرازي الجديد"},
            {"code": "E11.9", "date": "10/11/2025", "hospital": "مشفى الكندي"}
        ]
    },
    {
        "id": "040105002", 
        "name": "سامي العبدالله", 
        "age": 30, 
        "gender": "ذكر",
        "socialStatus": "متزوج",
        "dob": "15/5/1994",
        "phone": "0987654321",
        "address": "دمشق - المزة",
        "workAddress": "دمشق - البرامكة",
        "lastVisit": "10/12/2025", 
        "code": "E11.9",
        "visits": [
            {"code": "E11.9", "date": "10/12/2025", "hospital": "مشفى المواساة"}
        ]
    }
]

# المسار الأول: جلب جميع المرضى (كما هو)
@app.route('/api/patients', methods=['GET'])
def get_patients():
    return jsonify(patients_data)

# مسار جديد: جلب مريض محدد بناءً على رقم الـ ID المُمرر في الرابط (مسار ديناميكي)
# <patient_id> هو المتغير الذي سيتم التقاطه من الرابط وتمريره للدالة كـ وسيط (Parameter)
@app.route('/api/patients/<patient_id>', methods=['GET'])
def get_single_patient(patient_id):
    # نبحث داخل مصفوفة المرضى عن المريض الذي يطابق الـ ID الخاص به الـ patient_id الممرر
    # next() تقوم بإرجاع أول عنصر يطابق الشرط، وإذا لم تجد شيئاً تُرجع None
    patient = next((p for p in patients_data if p["id"] == patient_id), None)
    
    if patient:
        # إذا وجدنا المريض، نعيد بياناته بصيغة JSON
        return jsonify(patient)
    else:
        # إذا لم نجده، نعيد رسالة خطأ مع رمز الحالة 404 (Not Found)
        return jsonify({"error": "المريض غير موجود"}), 404

if __name__ == '__main__':
    # تشغيل السيرفر على البورت 5000
    app.run(debug=True, port=5000)