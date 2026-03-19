export const FB_PIXEL_ID = "1356702236226359";

export interface PixelEventParams {
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    content_type?: string;
    value?: number;
    currency?: string;
    num_items?: number;
    [key: string]: any;
}

export const pageview = () => {
    if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "PageView");
    }
};

export const logEvent = (name: string, params?: PixelEventParams) => {
    if (typeof window !== "undefined" && window.fbq) {
        if (params) {
            window.fbq("track", name, params);
        } else {
            window.fbq("track", name);
        }
    }
};
