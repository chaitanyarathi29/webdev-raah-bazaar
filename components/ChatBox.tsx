interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  seller: {
    name: string;
    username: string;
  };
}

interface ChatBoxProps {
  product?: Product; // make it optional
  onClose?: () => void;
}

export default function ChatBox({ product, onClose }: ChatBoxProps) {
  // If product is not passed, render nothing or a fallback UI
  if (!product) {
    // Option 1: Render nothing
    return null;
    // Option 2: Render a message instead:
    // return <div>No product selected for chat.</div>;
  }

  // ...rest of your ChatBox code...
  return (
    <div>
      <h2>Chat with {product.seller.name}</h2>
      {/* rest of your chat UI */}
    </div>
  );
}
