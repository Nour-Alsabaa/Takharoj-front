from flask import Flask, jsonify
from flask_cors import CORS
import random
import time

app = Flask(__name__)
# السماح بواجهة React بالاتصال بالخادم
CORS(app)

# ==================== بيانات المرضى (من الكود الأول) ====================
patients_data = [
    {
        "id": "040105001", 
        "name": "أحمد العتيبي", 
        "age": 35, 
        "gender": "ذكر",
        "socialStatus": "أعزب",
        "dob": "12/1/1989",
        "phone": "0994616117",
        "address": "حمص - الفاخورة",
        "workAddress": "حمص - المدينة",
        "lastVisit": "12/12/2025", 
        "code": "J11.1",
        "visits": [
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

# ==================== بيانات المحافظات للنظام الوبائي (من الكود الثاني) ====================
GOVERNORATES = [
    "دمشق", "ريف دمشق", "حلب", "حمص", "حماة", "اللاذقية", 
    "طرطوس", "إدلب", "الرقة", "دير الزور", "الحسكة", "درعا", "السويداء", "القنيطرة"
]

# ==================== مسارات API الخاصة بالمرضى ====================

@app.route('/api/patients', methods=['GET'])
def get_patients():
    """جلب جميع المرضى"""
    return jsonify(patients_data)

@app.route('/api/patients/<patient_id>', methods=['GET'])
def get_single_patient(patient_id):
    """جلب مريض محدد بناءً على رقم الـ ID"""
    patient = next((p for p in patients_data if p["id"] == patient_id), None)
    
    if patient:
        return jsonify(patient)
    else:
        return jsonify({"error": "المريض غير موجود"}), 404

# إضافة مسار لإضافة مريض جديد (ميزة إضافية)
@app.route('/api/patients', methods=['POST'])
def add_patient():
    """إضافة مريض جديد إلى قاعدة البيانات"""
    from flask import request
    
    new_patient = request.json
    # التحقق من وجود ID فريد
    if any(p["id"] == new_patient.get("id") for p in patients_data):
        return jsonify({"error": "المريض موجود مسبقاً"}), 400
    
    # التأكد من وجود الحقول الأساسية
    required_fields = ["id", "name", "age", "gender", "socialStatus", "dob", "phone", "address", "workAddress"]
    for field in required_fields:
        if field not in new_patient:
            return jsonify({"error": f"الحقل {field} مطلوب"}), 400
    
    # إضافة قائمة الزيارات إذا لم تكن موجودة
    if "visits" not in new_patient:
        new_patient["visits"] = []
    
    if "lastVisit" not in new_patient:
        new_patient["lastVisit"] = ""
    
    if "code" not in new_patient:
        new_patient["code"] = ""
    
    patients_data.append(new_patient)
    return jsonify(new_patient), 201

# إضافة مسار لتحديث بيانات مريض
@app.route('/api/patients/<patient_id>', methods=['PUT'])
def update_patient(patient_id):
    """تحديث بيانات مريض موجود"""
    from flask import request
    
    patient = next((p for p in patients_data if p["id"] == patient_id), None)
    
    if not patient:
        return jsonify({"error": "المريض غير موجود"}), 404
    
    updated_data = request.json
    # تحديث الحقول الموجودة فقط
    for key, value in updated_data.items():
        if key in patient:
            patient[key] = value
    
    return jsonify(patient)

# إضافة مسار لحذف مريض
@app.route('/api/patients/<patient_id>', methods=['DELETE'])
def delete_patient(patient_id):
    """حذف مريض من قاعدة البيانات"""
    global patients_data
    
    patient = next((p for p in patients_data if p["id"] == patient_id), None)
    
    if not patient:
        return jsonify({"error": "المريض غير موجود"}), 404
    
    patients_data = [p for p in patients_data if p["id"] != patient_id]
    return jsonify({"message": "تم حذف المريض بنجاح"})

# ==================== مسارات API الخاصة بالنظام الوبائي ====================

@app.route('/api/epidemic-status', methods=['GET'])
def get_epidemic_status():
    """
    تحاكي هذه الدالة استعلاماً من قاعدة البيانات لتحليل عدد المرضى والاعراض
    في الوقت الحقيقي وتحديد مستوى الخطورة لكل محافظة.
    """
    data = {}
    
    for gov in GOVERNORATES:
        # توليد مؤشر خطورة وهمي بناءً على تحليلات قاعدة البيانات
        risk_score = random.randint(0, 100)
        
        # تصنيف الخطورة وتحديد الألوان للمنصة
        if risk_score > 80:
            status = "حرج (تفشي وبائي)"
            color = "#ef4444"  # أحمر
            cases = random.randint(500, 2000)
        elif risk_score > 50:
            status = "مرتفع (إنذار مبكر)"
            color = "#f97316"  # برتقالي
            cases = random.randint(100, 500)
        elif risk_score > 20:
            status = "متوسط (حالات اشتباه)"
            color = "#eab308"  # أصفر
            cases = random.randint(20, 100)
        else:
            status = "آمن (وضع طبيعي)"
            color = "#22c55e"  # أخضر
            cases = random.randint(0, 20)
            
        data[gov] = {
            "score": risk_score,
            "status": status,
            "color": color,
            "active_cases": cases,
            "last_updated": time.strftime("%H:%M:%S")
        }
        
    return jsonify({
        "success": True,
        "timestamp": time.time(),
        "regions": data
    })

# ==================== مسار إضافي للحصول على إحصائيات عامة ====================

@app.route('/api/dashboard-stats', methods=['GET'])
def get_dashboard_stats():
    """توفير إحصائيات عامة تجمع بين بيانات المرضى والوضع الوبائي"""
    
    # إحصائيات المرضى
    total_patients = len(patients_data)
    avg_age = sum(p["age"] for p in patients_data) / total_patients if total_patients > 0 else 0
    
    # إحصائيات الجنس
    male_count = sum(1 for p in patients_data if p["gender"] == "ذكر")
    female_count = sum(1 for p in patients_data if p["gender"] == "أنثى")
    
    # إحصائيات الحالة الاجتماعية
    married_count = sum(1 for p in patients_data if p["socialStatus"] == "متزوج")
    single_count = sum(1 for p in patients_data if p["socialStatus"] == "أعزب")
    
    return jsonify({
        "patients_stats": {
            "total": total_patients,
            "average_age": round(avg_age, 1),
            "male_count": male_count,
            "female_count": female_count,
            "married_count": married_count,
            "single_count": single_count
        },
        "total_visits": sum(len(p.get("visits", [])) for p in patients_data)
    })

# ==================== تشغيل السيرفر ====================

if __name__ == '__main__':
    print("=" * 50)
    print("🚀 تم تشغيل السيرفر المتكامل على المنفذ 5000")
    print("=" * 50)
    print("\n📋 مسارات API المتاحة:")
    print("  🏥 مسارات إدارة المرضى:")
    print("    GET    /api/patients          - جلب جميع المرضى")
    print("    GET    /api/patients/<id>     - جلب مريض محدد")
    print("    POST   /api/patients          - إضافة مريض جديد")
    print("    PUT    /api/patients/<id>     - تحديث بيانات مريض")
    print("    DELETE /api/patients/<id>     - حذف مريض")
    print("\n  🦠 مسارات النظام الوبائي:")
    print("    GET    /api/epidemic-status   - جلب حالة التفشي الوبائي")
    print("    GET    /api/dashboard-stats   - جلب إحصائيات عامة")
    print("\n" + "=" * 50)
    
    app.run(debug=True, port=5000)