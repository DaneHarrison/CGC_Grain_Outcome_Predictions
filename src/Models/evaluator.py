from sklearn.metrics import precision_score  # type: ignore
from sklearn.metrics import accuracy_score  # type: ignore
from sklearn.metrics import roc_auc_score  # type: ignore
from sklearn.metrics import recall_score  # type: ignore
from sklearn.metrics import roc_curve  # type: ignore
from sklearn.metrics import f1_score  # type: ignore
from sklearn.metrics import log_loss  # type: ignore
from collections import Counter
from typing import Dict
import numpy as np
import os


class ModelEvaluator:
    def evaluateClassification(
        self,
        model,
        yTrainSet,
        yTrue,
        desc=None,
        saveFactorsLoc=None,
        hasFeatImportance=True
    ) -> dict:
        yPred = model.predict(yTrainSet)
        results = {}

        results["accuracy"] = accuracy_score(yTrue, yPred)
        results["loss"] = log_loss(yTrue, yPred)
        results["precision"] = precision_score(yTrue, yPred)
        results["recall"] = recall_score(yTrue, yPred)
        results["f1"] = f1_score(yTrue, yPred)
        results["auc"] = roc_auc_score(yTrue, yPred)

        if hasFeatImportance:
            print('feature importance')
            results["importances"] = list(
                zip(model.feature_importances_, yTrainSet.columns)
            )
            results["importances"].sort(reverse=True)
            results["importances"] = results["importances"][:10]

            self.__saveRelevantFeatures(results["importances"], saveFactorsLoc)

        #print(f"[SUCCESS] evaluated {desc}")
        print(f'\taccuracy = {results["accuracy"]}')
        print(f'\tloss = {results["loss"]}')
        print(f'\tprecision = {results["precision"]}')
        print(f'\trecall = {results["recall"]}')
        print(f'\tf1 = {results["f1"]}')
        print(f'\tauc = {results["auc"]}')

        if hasFeatImportance:
            print(f"\tthe top 10 most relevant attributes were:")

            for i in range(10):
                print(f'\t\t{i}{results["importances"][i]}')
        else:
            results["importances"] = ['This model type does not support feature importance']

        print()

        return results

    def evaluateRegression(
        self,
        model,
        desc,
        xTrainSet,
        yTrainSet,
        xTestSet,
        yTestSet,
        saveFactorsLoc=None,
        hasFeatImportance=True,
        numCV=5,
    ) -> dict:
        results = {}

        results["desc"] = desc

        calc_accuracies = cross_val_score(
            model, xTestSet, yTestSet, cv=numCV, scoring="neg_mean_squared_error"
        )
        results["avg_accuracy"] = np.average(calc_accuracies)

        results["r2"] = model.score(xTestSet, yTestSet)

        if hasFeatImportance:
            results["importances"] = list(
                zip(model.feature_importances_, xTestSet.columns)
            )
            results["importances"].sort(reverse=True)
            results["importances"] = results["importances"][:10]

            # self.__saveRelevantFeatures(results["importances"], saveFactorsLoc)

        print(f"[SUCCESS] evaluated {desc}")
        print(f'\tavg_accuracy = {results["avg_accuracy"]}')
        print(f'\tr2 = {results["r2"]}')

        if hasFeatImportance:
            print(f"\tThe top 10 most relevant attributes were:")

            for i in range(10):
                print(f'\t\t{i}: {results["importances"][i]}')

        print()

        return results

    def __saveRelevantFeatures(self, features, saveFactorsLoc):
        if saveFactorsLoc != None:
            try:
                os.chdir(os.path.dirname(os.path.abspath(__file__)))

                with open(saveFactorsLoc, "a") as file:
                    for i in range(10):
                        file.write(f"{features[i][1]},")
            except:
                pass

    def readRelevantFeatures(self, saveFactorsLoc) -> dict:
        dist: Dict[str, int] = {}

        try:
            os.chdir(os.path.dirname(os.path.abspath(__file__)))

            with open(saveFactorsLoc, "r") as file:
                content = file.read()

                allFeatures = content.split(",")
                dist = Counter(allFeatures)
        except:
            pass

        return dist
