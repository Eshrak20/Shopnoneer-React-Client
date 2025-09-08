import {
  ShieldCheck,
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";

const Feature = () => {
  const features = [
    {
      title: "Save Money",
      desc: "Securely save your money in your Shopnoneer.",
      icon: <Wallet className="w-10 h-10" style={{ color: "var(--primary)" }} />,
    },
    {
      title: "Top-up Money",
      desc: "Easily top-up your wallet balance from agents.",
      icon: (
        <ArrowUpCircle className="w-10 h-10" style={{ color: "var(--primary)" }} />
      ),
    },
    {
      title: "Withdraw Money",
      desc: "Withdraw cash instantly with service charges applied.",
      icon: (
        <ArrowDownCircle className="w-10 h-10" style={{ color: "var(--primary)" }} />
      ),
    },
    {
      title: "Send Money",
      desc: "Transfer money securely to other users in seconds.",
      icon: <Send className="w-10 h-10" style={{ color: "var(--primary)" }} />,
    },
    {
      title: "Agent Services",
      desc: "Agents can top-up money for users and assist with transactions.",
      icon: <ShieldCheck className="w-10 h-10" style={{ color: "var(--primary)" }} />,
    },
    {
      title: "Service Fees",
      desc: "For every 1000+ Taka cash-out, a fee of 20 Taka is applied. This fee is shared between the Agent and Admin.",
      icon: <ShieldCheck className="w-10 h-10" style={{ color: "var(--primary)" }} />,
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
            Features
          </motion.h1>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-card text-card-foreground p-6 rounded-xl shadow hover:shadow-lg hover:bg-secondary transition"
              >
                <div className="mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Feature;