import { Helmet } from "react-helmet-async";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import faqData from "./Faq.json";

const Faq = () => {
  return (
    <>
      <Helmet>
        <title>স্বপ্ননীড় | সচরাচর প্রশ্ন</title>
      </Helmet>
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-20 py-10 pt-24">
        <div className="p-6 bg-card shadow-lg rounded-lg border border-border">
          <h1 className="text-xl lg:text-3xl font-bold text-primary text-center mb-8">
            প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী (FAQ)
          </h1>

          <div className="space-y-4">
            {faqData.length > 0 ? (
              faqData.map((faq, index) => (
                <Collapsible key={index} className="border border-border rounded-md" defaultOpen={index === 0}>
                  <CollapsibleTrigger className="flex w-full text-left bg-secondary px-4 py-3 rounded-t-md font-medium text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                    <span className="flex-1">
                      {index + 1}. {faq.question}
                    </span>
                    <span className="ml-2 transform transition-transform duration-200 collapsible-trigger-icon">
                      ▼
                    </span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 bg-muted rounded-b-md text-muted-foreground">
                    {faq.answer}
                  </CollapsibleContent>
                </Collapsible>
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                কোনো সচরাচর প্রশ্ন নাই.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;