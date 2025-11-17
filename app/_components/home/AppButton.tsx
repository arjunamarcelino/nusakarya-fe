import { cn } from "../../_libs/utils";
import { PrimaryButton } from "../ui/Button";
import { useRouter } from "next/navigation";

export default function AppButton({
  className,
}: {
  className?: string;
}) {

  const router = useRouter();
  const handleClick = () => {
    router.push("/app");
  };

  return (
    <PrimaryButton
      onClick={handleClick}
      className={cn("px-8 text-sm", className)}
    >
      <div className="p-0.5 bg-[var(--color-karya-gold)] rounded-full !text-xs"></div>
      DAFTAR KARYA
    </PrimaryButton>
  );
}
