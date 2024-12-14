type HeaderProps = {
  title: string;
  subtitle: string;
};

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header__title">{title}</h1>
      <h2 className="header__subtitle">{subtitle}</h2>
    </header>
  );
}
