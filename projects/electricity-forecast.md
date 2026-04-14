# Household Electricity Peak Forecasting – Machine Learning & Analytics

## Project Overview
A predictive analytics framework for household electricity peak demand forecasting, built using ~2 million records from the UCI Machine Learning Repository. This project demonstrates end-to-end data science workflow: preprocessing, feature engineering, model evaluation, and business-aligned reporting.

## Problem Statement
Accurate peak demand forecasting enables utilities to optimize grid operations, reduce costs, and improve reliability. This project explores whether machine learning models can predict peak usage patterns with high accuracy using historical consumption data.

## Data & Preprocessing
- **Source**: UCI Household Electric Power Consumption dataset (~2M records, 2006-2010)
- **Features**: Global active/reactive power, voltage, intensity, sub-metering data, timestamps
- **Preprocessing Pipeline**:
  - Missing value interpolation using forward-fill and linear methods
  - Outlier detection and removal via IQR (Interquartile Range)
  - Feature scaling with StandardScaler for neural network compatibility
  - Temporal feature engineering: hour-of-day, day-of-week, month indicators
  - Dimensionality reduction with PCA (retained 95% variance)

## Modeling Approach
Evaluated four model architectures:
1. **LSTM (Long Short-Term Memory)**: Captured temporal dependencies in time-series data
2. **SVR (Support Vector Regression)**: Handled non-linear relationships with kernel tricks
3. **Random Forest**: Ensemble method for robustness against overfitting
4. **Decision Tree**: Baseline model for interpretability

### Training Configuration
- Train/Test Split: 80/20 with temporal ordering preserved
- Validation: Time-series cross-validation (rolling window)
- Metrics: R² score, MAE (Mean Absolute Error), RMSE (Root Mean Squared Error)

## Results
| Model | R² Score | MAE (kW) | RMSE (kW) | Training Time |
|-------|----------|----------|-----------|--------------|
| Random Forest | **0.998** | 0.12 | 0.18 | ~45 seconds |
| LSTM | 0.996 | 0.15 | 0.22 | ~8 minutes |
| SVR | 0.991 | 0.21 | 0.31 | ~2 minutes |
| Decision Tree | 0.987 | 0.28 | 0.41 | ~10 seconds |

✅ Random Forest achieved highest accuracy with fastest training time  
✅ All models exceeded 0.98 R², indicating strong predictive power  
✅ Feature importance analysis identified global active power and time-of-day as top predictors

## Business Impact & Interpretation
- **Operational Value**: Accurate peak forecasts enable proactive grid management and cost optimization
- **Model Interpretability**: Random Forest feature importance highlighted actionable drivers (e.g., evening usage spikes)
- **Scalability**: Pipeline designed to handle larger datasets with minimal reconfiguration

## Lessons Learned
1. **Preprocessing is 80% of the work**: Clean, well-engineered features mattered more than model complexity
2. **Start simple**: Random Forest outperformed deep learning with less tuning and faster iteration
3. **Temporal ordering is critical**: Time-series data requires careful train/test splitting to avoid leakage
4. **Business context drives model choice**: Accuracy alone isn't enough; interpretability and speed matter for operational adoption

## Future Enhancements
- [ ] Incorporate external features: weather data, holidays, tariff schedules
- [ ] Deploy model as REST API for real-time forecasting
- [ ] Add uncertainty quantification (prediction intervals) for risk-aware decisions
- [ ] Explore ensemble methods combining LSTM + Random Forest strengths

## Repository
🔗 [https://github.com/kushaniC/Electricity-Forecasting](https://github.com/kushaniC/Electricity-Forecasting)

## Stack
- Python (Pandas, NumPy, Scikit-learn, TensorFlow, Matplotlib)
- Jupyter Notebook for exploration, Python scripts for production pipeline
- UCI Machine Learning Repository dataset
- Git for version control

