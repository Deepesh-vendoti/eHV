interface ToastOptions {
  title: string;
  description: string;
  variant?: 'default' | 'destructive';
}

export function toast(options: ToastOptions) {
  // For now, we'll use console.log as a placeholder
  // Later, we can integrate a proper toast library like react-hot-toast or react-toastify
  console.log(`[${options.variant || 'default'}] ${options.title}: ${options.description}`);
} 