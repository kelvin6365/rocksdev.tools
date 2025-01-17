"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, Copy, FileJson, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

const JsonToJavaConverter = () => {
  const t = useTranslations("converters.json-to-java-bean");
  const [jsonInput, setJsonInput] = useState("");
  const [className, setClassName] = useState("MyClass");
  const [packageName, setPackageName] = useState("com.example");
  const [useLombok, setUseLombok] = useState(true);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isConfigOpen, setIsConfigOpen] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const generatedClasses = new Map();

  const sampleJson = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    isActive: true,
    roles: ["USER", "ADMIN"],
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      country: "USA",
      zipCode: "10001",
      location: {
        latitude: 40.7128,
        longitude: -74.006,
      },
    },
    contact: {
      phone: "+1-234-567-8900",
      alternativeEmail: "john.doe@example.com",
      socialMedia: {
        twitter: "@johndoe",
        linkedin: "linkedin.com/in/johndoe",
      },
    },
    company: {
      name: "Tech Corp",
      position: "Senior Developer",
      department: {
        name: "Engineering",
        code: "ENG-001",
        location: "Building A",
      },
    },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T12:34:56Z",
    score: 95.5,
  };

  const loadExample = () => {
    setJsonInput(JSON.stringify(sampleJson, null, 2));
    setError("");
  };

  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getJavaType = (value: any, key: string): string => {
    if (value === null) return "Object";
    if (Array.isArray(value)) {
      if (value.length > 0) {
        return `List<${getJavaType(value[0], key)}>`;
      }
      return "List<Object>";
    }
    switch (typeof value) {
      case "string":
        // Check if it's a date string
        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
          return "LocalDateTime";
        }
        return "String";
      case "number":
        return Number.isInteger(value) ? "Integer" : "Double";
      case "boolean":
        return "Boolean";
      case "object": {
        // Generate a nested class name based on the parent field name
        const nestedClassName = capitalizeFirstLetter(key);
        generatedClasses.set(nestedClassName, value);
        return nestedClassName;
      }
      default:
        return "Object";
    }
  };

  const generateNestedClass = (className: string, jsonObject: any): string => {
    let nestedClassCode = "\n";

    // Class annotations
    if (useLombok) {
      nestedClassCode += "    @Data\n";
      nestedClassCode += "    @NoArgsConstructor\n";
      nestedClassCode += "    @AllArgsConstructor\n";
    }

    // Nested class declaration
    nestedClassCode += `    public static class ${className} {\n\n`;

    // Fields
    Object.entries(jsonObject).forEach(([key, value]) => {
      const javaType = getJavaType(value, key);
      nestedClassCode += `        private ${javaType} ${key};\n`;
    });

    // If not using Lombok, generate getters and setters
    if (!useLombok) {
      nestedClassCode += "\n";
      Object.entries(jsonObject).forEach(([key, value]) => {
        const javaType = getJavaType(value, key);
        const capitalizedKey = capitalizeFirstLetter(key);

        // Getter
        nestedClassCode += `        public ${javaType} get${capitalizedKey}() {\n`;
        nestedClassCode += `            return ${key};\n`;
        nestedClassCode += "        }\n\n";

        // Setter
        nestedClassCode += `        public void set${capitalizedKey}(${javaType} ${key}) {\n`;
        nestedClassCode += `            this.${key} = ${key};\n`;
        nestedClassCode += "        }\n\n";
      });
    }

    nestedClassCode += "    }\n";
    return nestedClassCode;
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (err) {
      setError(t("errors.invalid-json"));
    }
  };

  const generateJavaClass = async () => {
    try {
      setIsGenerating(true);
      setError("");
      const jsonObject = JSON.parse(jsonInput);
      let javaCode = "";
      // Clear previously generated classes
      generatedClasses.clear();

      // Package declaration
      javaCode += `package ${packageName};\n\n`;

      // Imports
      javaCode += "import java.util.List;\n";
      javaCode += "import java.time.LocalDateTime;\n";
      if (useLombok) {
        javaCode += "import lombok.Data;\n";
        javaCode += "import lombok.NoArgsConstructor;\n";
        javaCode += "import lombok.AllArgsConstructor;\n";
      }
      javaCode += "\n";

      // Class annotations
      if (useLombok) {
        javaCode += "@Data\n";
        javaCode += "@NoArgsConstructor\n";
        javaCode += "@AllArgsConstructor\n";
      }

      // Class declaration
      javaCode += `public class ${className} {\n\n`;

      // Fields
      Object.entries(jsonObject).forEach(([key, value]) => {
        const javaType = getJavaType(value, key);
        javaCode += `    private ${javaType} ${key};\n`;
      });

      // If not using Lombok, generate getters and setters
      if (!useLombok) {
        javaCode += "\n";
        Object.entries(jsonObject).forEach(([key, value]) => {
          const javaType = getJavaType(value, key);
          const capitalizedKey = capitalizeFirstLetter(key);

          // Getter
          javaCode += `    public ${javaType} get${capitalizedKey}() {\n`;
          javaCode += `        return ${key};\n`;
          javaCode += "    }\n\n";

          // Setter
          javaCode += `    public void set${capitalizedKey}(${javaType} ${key}) {\n`;
          javaCode += `        this.${key} = ${key};\n`;
          javaCode += "    }\n\n";
        });
      }

      // Generate nested classes
      for (const [nestedClassName, nestedObject] of generatedClasses) {
        javaCode += generateNestedClass(nestedClassName, nestedObject);
      }

      javaCode += "}";
      setOutput(javaCode);
    } catch (err) {
      setError(t("errors.invalid-json"));
      setOutput("");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="space-y-4">
      <CardContent className="px-0 pb-0 flex flex-col gap-6">
        {/* Configuration Section */}
        <Collapsible
          open={isConfigOpen}
          onOpenChange={setIsConfigOpen}
          className="w-full space-y-2"
        >
          <div className="flex items-center justify-between space-x-4">
            <h4 className="text-sm font-semibold">{t("config.title")}</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronDown
                  className="h-4 w-4 transition-transform duration-200"
                  style={{
                    transform: isConfigOpen
                      ? "rotate(-180deg)"
                      : "rotate(0deg)",
                  }}
                />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="space-y-4 bg-gray-50 p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>{t("config.package-name")}</Label>
                <Input
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  placeholder="com.example"
                />
              </div>
              <div>
                <Label>{t("config.class-name")}</Label>
                <Input
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="MyClass"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch checked={useLombok} onCheckedChange={setUseLombok} />
              <Label>{t("config.use-lombok")}</Label>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Input Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>{t("input.title")}</Label>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={loadExample}>
                <FileJson className="h-4 w-4 mr-2" />
                {t("input.loadExample")}
              </Button>
              <Button variant="ghost" size="sm" onClick={formatJson}>
                <RefreshCw className="h-4 w-4 mr-2" />
                {t("input.format")}
              </Button>
            </div>
          </div>
          <Textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder={t("input.placeholder")}
            className="font-mono h-48"
          />
        </div>

        <Button
          onClick={generateJavaClass}
          className="w-full"
          disabled={isGenerating}
        >
          <FileJson className="h-4 w-4 mr-2" />
          {isGenerating ? t("generating") : t("generate")}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Output Section */}
        {output && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>{t("output.title")}</Label>
              <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                {t("output.copy")}
              </Button>
            </div>
            <Textarea value={output} readOnly className="font-mono h-96" />
          </div>
        )}
      </CardContent>
    </div>
  );
};

export default JsonToJavaConverter;
