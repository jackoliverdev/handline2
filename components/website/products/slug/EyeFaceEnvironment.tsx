"use client";

import React from "react";
import { FlaskConical, Bug, Zap } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { EnvironmentPictograms } from "@/lib/products-service";

type Props = {
  environment_pictograms: EnvironmentPictograms;
  className?: string;
};

export function EyeFaceEnvironment({ environment_pictograms, className = "" }: Props) {
  const { t } = useLanguage();

  const items = [
    {
      key: "chemical",
      icon: FlaskConical,
      title: t("productPage.chemicalExposure"),
      description: `${t("productPage.suitableFor")} ${t("productPage.chemicalExposure").toLowerCase()}`,
      enabled: !!environment_pictograms?.chemical,
    },
    {
      key: "biological",
      icon: Bug,
      title: t("productPage.biologicalHazards"),
      description: `${t("productPage.suitableFor")} ${t("productPage.biologicalHazards").toLowerCase()}`,
      enabled: !!environment_pictograms?.biological,
    },
    {
      key: "electrical",
      icon: Zap,
      title: t("productPage.electrical"),
      description: `${t("productPage.suitableFor")} ${t("productPage.electrical").toLowerCase()}`,
      enabled: !!(environment_pictograms as any)?.electrical,
    },
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-4">
        {t("productPage.workEnvironmentSuitability")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isEnabled = item.enabled;
          return (
            <div
              key={item.key}
              className={`group relative overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md backdrop-blur-sm p-3 ${
                isEnabled
                  ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon
                    className={`h-4 w-4 ${
                      isEnabled ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    }`}
                  />
                  <h4
                    className={`font-medium text-sm ${
                      isEnabled ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"
                    }`}
                  >
                    {item.title}
                  </h4>
                </div>
                <div
                  className={`text-sm font-bold ${
                    isEnabled ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"
                  }`}
                >
                  {isEnabled ? t("productPage.yes") : t("productPage.no")}
                </div>
              </div>

              <p
                className={`text-xs ${
                  isEnabled ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}
              >
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}


