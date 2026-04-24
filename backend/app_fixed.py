from flask import Flask, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)
# السماح بواجهة React بالاتصال بالخادم
CORS(app)

# ==================== بيانات المرضى ====================
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
    },
    {
        "id": "040105003", 
        "name": "فاطمة الحسين", 
        "age": 28, 
        "gender": "أنثى",
        "socialStatus": "متزوجة",
        "dob": "23/3/1996",
        "phone": "0912345678",
        "address": "حلب - الجديد",
        "workAddress": "حلب - الصناعة",
        "lastVisit": "05/01/2026", 
        "code": "J15.0",
        "visits": [
            {"code": "J15.0", "date": "05/01/2026", "hospital": "مشفى حلب الجامعي"},
            {"code": "J11.1", "date": "20/12/2025", "hospital": "مشفى الرازي"}
        ]
    }
]

# ==================== بيانات ثابتة للوضع الوبائي ====================
# بيانات ثابتة لكل محافظة (بدون توليد عشوائي)
EPIDEMIC_DATA = {
    "دمشق": {
        "score": 75,
        "status": "مرتفع (إنذار مبكر)",
        "color": "#f97316",
        "active_cases": 320,
        "risk_level": "high"
    },
    "ريف دمشق": {
        "score": 45,
        "status": "متوسط (حالات اشتباه)",
        "color": "#eab308",
        "active_cases": 85,
        "risk_level": "medium"
    },
    "حلب": {
        "score": 90,
        "status": "حرج (تفشي وبائي)",
        "color": "#ef4444",
        "active_cases": 1200,
        "risk_level": "critical"
    },
    "حمص": {
        "score": 35,
        "status": "متوسط (حالات اشتباه)",
        "color": "#eab308",
        "active_cases": 55,
        "risk_level": "medium"
    },
    "حماة": {
        "score": 25,
        "status": "متوسط (حالات اشتباه)",
        "color": "#eab308",
        "active_cases": 40,
        "risk_level": "medium"
    },
    "اللاذقية": {
        "score": 60,
        "status": "مرتفع (إنذار مبكر)",
        "color": "#f97316",
        "active_cases": 150,
        "risk_level": "high"
    },
    "طرطوس": {
        "score": 15,
        "status": "آمن (وضع طبيعي)",
        "color": "#22c55e",
        "active_cases": 8,
        "risk_level": "safe"
    },
    "إدلب": {
        "score": 85,
        "status": "حرج (تفشي وبائي)",
        "color": "#ef4444",
        "active_cases": 850,
        "risk_level": "critical"
    },
    "الرقة": {
        "score": 55,
        "status": "مرتفع (إنذار مبكر)",
        "color": "#f97316",
        "active_cases": 110,
        "risk_level": "high"
    },
    "دير الزور": {
        "score": 40,
        "status": "متوسط (حالات اشتباه)",
        "color": "#eab308",
        "active_cases": 70,
        "risk_level": "medium"
    },
    "الحسكة": {
        "score": 30,
        "status": "متوسط (حالات اشتباه)",
        "color": "#eab308",
        "active_cases": 45,
        "risk_level": "medium"
    },
    "درعا": {
        "score": 20,
        "status": "آمن (وضع طبيعي)",
        "color": "#22c55e",
        "active_cases": 12,
        "risk_level": "safe"
    },
    "السويداء": {
        "score": 10,
        "status": "آمن (وضع طبيعي)",
        "color": "#22c55e",
        "active_cases": 5,
        "risk_level": "safe"
    },
    "القنيطرة": {
        "score": 5,
        "status": "آمن (وضع طبيعي)",
        "color": "#22c55e",
        "active_cases": 2,
        "risk_level": "safe"
    }
}

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

@app.route('/api/patients/<patient_id>', methods=['DELETE'])
def delete_patient(patient_id):
    """حذف مريض من قاعدة البيانات"""
    global patients_data
    
    patient = next((p for p in patients_data if p["id"] == patient_id), None)
    
    if not patient:
        return jsonify({"error": "المريض غير موجود"}), 404
    
    patients_data = [p for p in patients_data if p["id"] != patient_id]
    return jsonify({"message": "تم حذف المريض بنجاح"})

# ==================== مسارات API الخاصة بالنظام الوبائي (بيانات ثابتة) ====================

@app.route('/api/epidemic-status', methods=['GET'])
def get_epidemic_status():
    """
    إرجاع بيانات الوضع الوبائي الثابتة (بدون توليد عشوائي)
    """
    # إضافة وقت آخر تحديث ثابت
    current_time = time.strftime("%H:%M:%S")
    
    # إضافة last_updated لكل محافظة
    regions_data = {}
    for gov, data in EPIDEMIC_DATA.items():
        regions_data[gov] = {
            "score": data["score"],
            "status": data["status"],
            "color": data["color"],
            "active_cases": data["active_cases"],
            "last_updated": current_time,
            "risk_level": data["risk_level"]
        }
    
    return jsonify({
        "success": True,
        "timestamp": time.time(),
        "last_full_update": time.strftime("%Y-%m-%d %H:%M:%S"),
        "regions": regions_data
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
    married_count = sum(1 for p in patients_data if p["socialStatus"] in ["متزوج", "متزوجة"])
    single_count = sum(1 for p in patients_data if p["socialStatus"] in ["أعزب", "عزباء"])
    
    # إحصائيات الوضع الوبائي
    total_active_cases = sum(data["active_cases"] for data in EPIDEMIC_DATA.values())
    critical_governorates = sum(1 for data in EPIDEMIC_DATA.values() if data["risk_level"] == "critical")
    high_risk_governorates = sum(1 for data in EPIDEMIC_DATA.values() if data["risk_level"] == "high")
    
    return jsonify({
        "patients_stats": {
            "total": total_patients,
            "average_age": round(avg_age, 1),
            "male_count": male_count,
            "female_count": female_count,
            "married_count": married_count,
            "single_count": single_count
        },
        "epidemic_stats": {
            "total_active_cases": total_active_cases,
            "critical_governorates": critical_governorates,
            "high_risk_governorates": high_risk_governorates,
            "total_governorates": len(EPIDEMIC_DATA)
        },
        "total_visits": sum(len(p.get("visits", [])) for p in patients_data)
    })

# ==================== مسار للحصول على ملخص سريع ====================

@app.route('/api/summary', methods=['GET'])
def get_summary():
    """ملخص سريع للمعلومات الأساسية"""
    return jsonify({
        "total_patients": len(patients_data),
        "total_governorates": len(EPIDEMIC_DATA),
        "critical_areas": sum(1 for data in EPIDEMIC_DATA.values() if data["risk_level"] == "critical"),
        "last_update": time.strftime("%Y-%m-%d %H:%M:%S"),
        "alerts": [
            "⚠️ تحذير: تفشي وبائي في حلب وإدلب",
            "📊 ارتفاع الحالات في دمشق واللاذقية",
            "✅ المناطق الجنوبية آمنة نسبياً"
        ]
    })

# ==================== تشغيل السيرفر ====================

if __name__ == '__main__':
    print("=" * 50)
    print("🚀 تم تشغيل السيرفر المتكامل (بنظام البيانات الثابتة)")
    print("=" * 50)
    print("\n📋 ملخص البيانات الثابتة:")
    print(f"  🏥 عدد المرضى: {len(patients_data)}")
    print(f"  🦠 عدد المحافظات: {len(EPIDEMIC_DATA)}")
    print(f"  🔴 مناطق حرجة: {sum(1 for data in EPIDEMIC_DATA.values() if data['risk_level'] == 'critical')}")
    print(f"  🟠 مناطق عالية الخطورة: {sum(1 for data in EPIDEMIC_DATA.values() if data['risk_level'] == 'high')}")
    print(f"  🟢 مناطق آمنة: {sum(1 for data in EPIDEMIC_DATA.values() if data['risk_level'] == 'safe')}")
    
    print("\n📋 مسارات API المتاحة:")
    print("  🏥 مسارات إدارة المرضى:")
    print("    GET    /api/patients          - جلب جميع المرضى")
    print("    GET    /api/patients/<id>     - جلب مريض محدد")
    print("    POST   /api/patients          - إضافة مريض جديد")
    print("    PUT    /api/patients/<id>     - تحديث بيانات مريض")
    print("    DELETE /api/patients/<id>     - حذف مريض")
    print("\n  🦠 مسارات النظام الوبائي:")
    print("    GET    /api/epidemic-status   - جلب حالة التفشي الوبائي (بيانات ثابتة)")
    print("    GET    /api/dashboard-stats   - جلب إحصائيات عامة")
    print("    GET    /api/summary           - جلب ملخص سريع")
    print("\n" + "=" * 50)
    print("💡 ملاحظة: جميع البيانات ثابتة وليست عشوائية")
    print("=" * 50)
    
    app.run(debug=True, port=5000)