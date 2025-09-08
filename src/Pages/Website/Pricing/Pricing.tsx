import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";

const Pricing = () => {
  const tiers = [
    {
      name: "Add Money",
      price: "Free",
      desc: "Access core features like saving and sending money.",
    },
    {
      name: "Withdraw Money",
      price: "৳20/1000",
      desc: "Lower cash-out fees and priority support.",
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "Tailored solutions for businesses and agents.",
    },
  ];
  
  return (
    <>
      <div className="bg-background text-foreground min-h-screen pt-24 px-6">
        <section className="max-w-6xl mx-auto py-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-12"
            style={{ color: "var(--primary)" }}
          >
            Pricing & Service Fees
          </motion.h1>

          <p className="text-center text-muted-foreground mb-8">
            For every 1000 Taka or above cash-out, a service fee of 20 Taka
            applies. This fee is divided equally between the Agent and the
            Admin.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-card text-card-foreground p-6 rounded-xl shadow hover:shadow-lg hover:bg-secondary transition text-center"
              >
                <DollarSign
                  className="w-10 h-10 mx-auto mb-4"
                  style={{ color: "var(--primary)" }}
                />
                <h3 className="text-2xl font-semibold mb-2">{tier.name}</h3>
                <p className="text-xl mb-2">{tier.price}</p>
                <p className="text-muted-foreground">{tier.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Pricing;