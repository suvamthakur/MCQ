export default function RecipeItem({ recipe }) {
  const { image } = recipe;

  return (
    <div
      style={{
        width: "250px",
        height: "250px",
      }}
    >
      <img
        src={image}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        loading="lazy" // Load images only when they enter the viewport, not all at once.
      />
    </div>
  );
}
