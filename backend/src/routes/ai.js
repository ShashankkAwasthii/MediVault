const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const { analyzeMedicineSideEffects, triageSymptoms } = require("../config/ai");

const router = express.Router();

router.post("/medicine", verifyToken, async (req, res) => {
    try {
        const { medicine_name } = req.body;
        if (!medicine_name) {
            return res.status(400).json({ message: "medicine_name is required" });
        }

        const result = await analyzeMedicineSideEffects(medicine_name);
        if (!result.success) {
            return res.status(502).json({ message: `AI failed: ${result.error}` });
        }

        return res.status(200).json({
            medicine: medicine_name,
            explanation: result.data,
            is_mock: !!result.mock,
        });
    } catch (error) {
        console.error("Error in /ai/medicine:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/triage", verifyToken, async (req, res) => {
    try {
        const { symptoms } = req.body;
        if (!symptoms) {
            return res.status(400).json({ message: "symptoms is required" });
        }

        const result = await triageSymptoms(symptoms);
        if (!result.success) {
            return res.status(502).json({ message: `AI failed: ${result.error}` });
        }

        return res.status(200).json({
            symptoms,
            triage: result.data,
            is_mock: !!result.mock,
            disclaimer: "This is not a medical diagnosis. Always consult a qualified doctor.",
        });
    } catch (error) {
        console.error("Error in /ai/triage:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;